import { TokenConfig } from '../types/token';
import { ethers } from 'ethers';

interface CompiledContract {
  abi: any[];
  bytecode: string;
}

export class ContractGenerator {
  async generateContract(config: TokenConfig): Promise<CompiledContract> {
    try {
      console.log('Iniciando generación del contrato...');
      const sourceCode = this.generateContractSource(config);
      console.log('Código fuente generado');

      const response = await fetch('http://localhost:3001/api/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sourceCode })
      });

      if (!response.ok) {
        throw new Error('Error en la compilación remota');
      }

      const { abi, bytecode } = await response.json();
      return { abi, bytecode };
    } catch (error) {
      console.error('Error detallado al compilar el contrato:', error);
      throw error;
    }
  }

  private generateContractSource(config: TokenConfig): string {
    const contractName = config.tokenName
      .replace(/[^a-zA-Z0-9]/g, '')  
      .replace(/^\d+/, '');          
    
    let contractCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
`;

    if (config.accessControl === 'ownable') {
      contractCode += 'import "@openzeppelin/contracts/access/Ownable.sol";\n';
    } else if (config.accessControl === 'roles') {
      contractCode += 'import "@openzeppelin/contracts/access/AccessControl.sol";\n';
    } else if (config.accessControl === 'manager') {
      contractCode += 'import "@openzeppelin/contracts/access/manager/AccessManaged.sol";\n';
    }

    if (config.standardFunctions.includes('burn')) {
      contractCode += 'import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";\n';
    }
    if (config.standardFunctions.includes('pause')) {
      contractCode += 'import "@openzeppelin/contracts/utils/Pausable.sol";\n';
    }
    if (config.standardFunctions.includes('cap')) {
      contractCode += 'import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";\n';
    }

    if (config.securityFunctions.includes('antiwhale') || 
        config.securityFunctions.includes('antibot') || 
        config.securityFunctions.includes('blacklist') || 
        config.securityFunctions.includes('allowlist')) {
      contractCode += 'import "@openzeppelin/contracts/utils/Context.sol";\n';
    }

    contractCode += `\ncontract ${contractName.toUpperCase()} is ERC20`;
    
    if (config.accessControl === 'ownable') {
      contractCode += ', Ownable';
    } else if (config.accessControl === 'roles') {
      contractCode += ', AccessControl';
    } else if (config.accessControl === 'manager') {
      contractCode += ', AccessManaged';
    }

    if (config.standardFunctions.includes('burn')) {
      contractCode += ', ERC20Burnable';
    }
    if (config.standardFunctions.includes('pause')) {
      contractCode += ', Pausable';
    }
    if (config.standardFunctions.includes('cap')) {
      contractCode += ', ERC20Capped';
    }

    contractCode += ` {
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol)`;

    if (config.standardFunctions.includes('cap')) {
      contractCode += ` ERC20Capped(${ethers.parseUnits(config.maxSupply!, parseInt(config.decimals))})`;
    }
    if (config.accessControl === 'ownable') {
      contractCode += ` Ownable(msg.sender)`;
    } else if (config.accessControl === 'manager') {
      contractCode += ` AccessManaged(msg.sender)`;
    }

    contractCode += ` {
        _mint(msg.sender, initialSupply);`;

    if (config.accessControl === 'roles') {
      contractCode += `
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        if (${config.standardFunctions.includes('mint')}) {
            _grantRole(MINTER_ROLE, msg.sender);
        }
        if (${config.standardFunctions.includes('pause')}) {
            _grantRole(PAUSER_ROLE, msg.sender);
        }`;
    }
    
    if (config.securityFunctions.includes('allowlist')) {
      contractCode += `
        _allowlist[msg.sender] = true;
        emit AllowlistUpdated(msg.sender, true);`;
    }

    contractCode += `
    }`;

    // Override decimals if different from 18
    if (config.decimals !== "18") {
      contractCode += `
    function decimals() public pure override returns (uint8) {
        return ${config.decimals};
    }`;
    }

    // Add mint function based on access control
    if (config.standardFunctions.includes('mint')) {
      if (config.accessControl === 'ownable') {
        contractCode += `
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }`;
      } else if (config.accessControl === 'roles') {
        contractCode += `
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }`;
      } else if (config.accessControl === 'manager') {
        contractCode += `
    function mint(address to, uint256 amount) public restricted {
        _mint(to, amount);
    }`;
      }
    }

    // Add pause functions
    if (config.standardFunctions.includes('pause')) {
      if (config.accessControl === 'ownable') {
        contractCode += `
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }`;
      } else if (config.accessControl === 'roles') {
        contractCode += `
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }`;
      } else if (config.accessControl === 'manager') {
        contractCode += `
    function pause() public restricted {
        _pause();
    }

    function unpause() public restricted {
        _unpause();
    }`;
      }
    }

    if (config.standardFunctions.includes('cap')) {
      contractCode += `
    function _update(address from, address to, uint256 value)
        internal
        virtual
        override(ERC20, ERC20Capped)
    {
        super._update(from, to, value);
    }`;
    }

    if (config.securityFunctions.includes('antiwhale')) {
      contractCode += `
    uint256 public maxHolderLimit = ${ethers.parseUnits(config.maxHolderLimit!, parseInt(config.decimals))};
    uint256 public maxTransactionAmount = ${ethers.parseUnits(config.maxTransactionAmount!, parseInt(config.decimals))};

    function setMaxHolderLimit(uint256 _limit) public onlyOwner {
        maxHolderLimit = _limit;
    }

    function setMaxTransactionAmount(uint256 _amount) public onlyOwner {
        maxTransactionAmount = _amount;
    }`;
    }

    if (config.securityFunctions.includes('antibot')) {
      contractCode += `
    uint256 public tradingCooldown = ${config.tradingCooldown || '60'}; 
    mapping(address => uint256) private _lastTradeTime;

    function setTradingCooldown(uint256 _cooldown) public onlyOwner {
        tradingCooldown = _cooldown;
    }`;
    }

    if (config.securityFunctions.includes('blacklist')) {
      contractCode += `
    mapping(address => bool) private _blacklist;
    event BlacklistUpdated(address indexed account, bool value);

    function setBlacklist(address account, bool value) public onlyOwner {
        _blacklist[account] = value;
        emit BlacklistUpdated(account, value);
    }

    function isBlacklisted(address account) public view returns (bool) {
        return _blacklist[account];
    }`;
    }

    if (config.securityFunctions.includes('allowlist')) {
      contractCode += `
    mapping(address => bool) private _allowlist;
    bool public allowlistEnabled = true;
    event AllowlistUpdated(address indexed account, bool value);

    function setAllowlist(address account, bool value) public onlyOwner {
        _allowlist[account] = value;
        emit AllowlistUpdated(account, value);
    }

    function setAllowlistEnabled(bool enabled) public onlyOwner {
        allowlistEnabled = enabled;
    }

    function isAllowlisted(address account) public view returns (bool) {
        return _allowlist[account];
    }`;
    }

    if (config.securityFunctions.length > 0) {
      contractCode += `
    function _update(
        address from,
        address to,
        uint256 value
    ) internal virtual override${config.standardFunctions.includes('cap') ? '(ERC20, ERC20Capped)' : ''} {
        if (from == address(0) && to == msg.sender) {
            super._update(from, to, value);
            return;
        }

        if (_blacklist[from] || _blacklist[to]) {
            revert("Blacklisted address");
        }
        
        if (allowlistEnabled) {
            if (!_allowlist[from] && !_allowlist[to]) {
                revert("Address not allowlisted");
            }
        }

        if (from != address(0) && to != address(0)) {
            if (${config.securityFunctions.includes('antiwhale')}) {
                if (value > maxTransactionAmount) {
                    revert("Exceeds max transaction amount");
                }
                if (balanceOf(to) + value > maxHolderLimit) {
                    revert("Exceeds max holder limit");
                }
            }
            
            if (${config.securityFunctions.includes('antibot')}) {
                if (block.timestamp < _lastTradeTime[from] + tradingCooldown) {
                    revert("Cooldown active");
                }
                _lastTradeTime[from] = block.timestamp;
            }
        }

        super._update(from, to, value);
    }`;
    }

    contractCode += '\n}';

    // Log the contract code in the summary step
    if (config.currentStep === 9) {
      console.log('Generated Contract Code:', contractCode);
    }

    return contractCode;
  }

  private async getFlattenedSourceCode(sourceCode: string): Promise<string> {
    try {
      const response = await fetch('http://localhost:3001/api/flatten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sourceCode })
      });

      if (!response.ok) {
        throw new Error('Error al aplanar el contrato');
      }

      const { flattenedCode } = await response.json();
      return flattenedCode;
    } catch (error) {
      console.error('Error al aplanar el contrato:', error);
      throw error;
    }
  }
}
