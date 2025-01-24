import { TokenConfig } from '../types/token';

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
    }

    if (config.standardFunctions.includes('burn')) {
      contractCode += 'import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";\n';
    }
    if (config.standardFunctions.includes('pause')) {
      contractCode += 'import "@openzeppelin/contracts/security/Pausable.sol";\n';
    }
    if (config.standardFunctions.includes('cap')) {
      contractCode += 'import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";\n';
    }

    contractCode += `\ncontract ${contractName.toUpperCase()} is ERC20`;
    
    if (config.accessControl === 'ownable') {
      contractCode += ', Ownable';
    } else if (config.accessControl === 'roles') {
      contractCode += ', AccessControl';
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
        uint256 initialSupply,
        uint8 decimals
    ) ERC20(name, symbol)`;

    if (config.standardFunctions.includes('cap')) {
      contractCode += ` ERC20Capped(initialSupply * 2)`;
    }
    if (config.accessControl === 'ownable') {
      contractCode += ` Ownable(msg.sender)`;
    }

    contractCode += ` {
        _mint(msg.sender, initialSupply);
    }`;

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
      }
    }

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
      }
    }

    contractCode += '\n}';

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
