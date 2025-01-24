import { ethers } from 'ethers';
import { ContractGenerator } from './contractGenerator';
import { TokenConfig } from '../types/token';

interface NetworkConfig {
  explorerUrl: string;
  apiKey: string;
  name: string;
}

const NETWORK_CONFIGS: { [key: string]: NetworkConfig } = {
  'ethereum': {
    explorerUrl: 'https://api.etherscan.io/api',
    apiKey: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY || '',
    name: 'Ethereum'
  },
  'arbitrum': {
    explorerUrl: 'https://api.arbiscan.io/api',
    apiKey: process.env.NEXT_PUBLIC_ARBISCAN_API_KEY || '',
    name: 'Arbitrum'
  },
  'avalanche': {
    explorerUrl: 'https://api.snowtrace.io/api',
    apiKey: process.env.NEXT_PUBLIC_SNOWTRACE_API_KEY || '',
    name: 'Avalanche'
  },
  'polygon': {
    explorerUrl: 'https://api.polygonscan.com/api',
    apiKey: process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY || '',
    name: 'Polygon'
  },
  'bsc': {
    explorerUrl: 'https://api.bscscan.com/api',
    apiKey: process.env.NEXT_PUBLIC_BSCSCAN_API_KEY || '',
    name: 'BSC'
  },
  'optimism': {
    explorerUrl: 'https://api-optimistic.etherscan.io/api',
    apiKey: process.env.NEXT_PUBLIC_OPTIMISM_API_KEY || '',
    name: 'Optimism'
  },
  'sepolia': {
    explorerUrl: 'https://api-sepolia.etherscan.io/api',
    apiKey: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY || '',
    name: 'Sepolia'
  },
  'arbitrum-goerli': {
    explorerUrl: 'https://api-goerli.arbiscan.io/api',
    apiKey: process.env.NEXT_PUBLIC_ARBISCAN_API_KEY || '',
    name: 'Arbitrum Goerli'
  },
  'avalanche-fuji': {
    explorerUrl: 'https://api-testnet.snowtrace.io/api',
    apiKey: process.env.NEXT_PUBLIC_SNOWTRACE_API_KEY || '',
    name: 'Avalanche Fuji'
  },
  'polygon-mumbai': {
    explorerUrl: 'https://api-testnet.polygonscan.com/api',
    apiKey: process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY || '',
    name: 'Polygon Mumbai'
  },
  'bsc-testnet': {
    explorerUrl: 'https://api-testnet.bscscan.com/api',
    apiKey: process.env.NEXT_PUBLIC_BSCSCAN_API_KEY || '',
    name: 'BSC Testnet'
  },
  'optimism-goerli': {
    explorerUrl: 'https://api-goerli-optimistic.etherscan.io/api',
    apiKey: process.env.NEXT_PUBLIC_OPTIMISM_API_KEY || '',
    name: 'Optimism Goerli'
  }
};

export class DeploymentService {
  private contractGenerator: ContractGenerator;

  constructor() {
    this.contractGenerator = new ContractGenerator();
  }

  async deployToken(config: TokenConfig, wallet: any): Promise<string> {
    try {
      const provider = await wallet.getEthereumProvider();
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();
      const sourceCode = await this.contractGenerator.generateContractSource(config);
      const { abi, bytecode } = await this.contractGenerator.generateContract(config);

      const factory = new ethers.ContractFactory(abi, bytecode, signer);
      const contract = await factory.deploy(
        config.tokenName,
        config.tokenSymbol,
        ethers.parseUnits(config.initialSupply.toString(), parseInt(config.decimals)),
        parseInt(config.decimals)
      );

      await contract.waitForDeployment();
      const contractAddress = await contract.getAddress();

      const receipt = await contract.deploymentTransaction()?.wait(2);
      
      if (!receipt) {
        throw new Error('Error esperando la confirmación del contrato');
      }

      const network = await ethersProvider.getNetwork();
      const chainId = Number(network.chainId);
      const networkName = this.getNetworkNameByChainId(chainId);

      if (networkName && NETWORK_CONFIGS[networkName]) {
        await new Promise(resolve => setTimeout(resolve, 30000));
        
        await this.verifyContract(
          contractAddress,
          sourceCode,
          [
            config.tokenName,
            config.tokenSymbol,
            ethers.parseUnits(config.initialSupply.toString(), parseInt(config.decimals)),
            parseInt(config.decimals)
          ],
          networkName,
          config,
          abi,
          chainId
        );
      }

      return contractAddress;
    } catch (error) {
      console.error('Error al desplegar el token:', error);
      throw error;
    }
  }

  private getNetworkNameByChainId(chainId: number): string | null {
    const networkMap: { [key: number]: string } = {
      11155111: 'sepolia',           // Sepolia
      421613: 'arbitrum-goerli',     // Arbitrum Goerli
      43113: 'avalanche-fuji',       // Avalanche Fuji
      80001: 'polygon-mumbai',       // Polygon Mumbai
      97: 'bsc-testnet',             // BSC Testnet
      420: 'optimism-goerli'         // Optimism Goerli
    };
    return networkMap[chainId] || null;
  }

  private async verifyContract(
    address: string, 
    sourceCode: string, 
    constructorArgs: any[], 
    network: string,
    config: TokenConfig,
    abi: any[],
    chainId: number
  ) {
    try {
      const networkConfig = NETWORK_CONFIGS[network];
      if (!networkConfig) {
        throw new Error('Red no soportada para verificación');
      }

      const flattenedCode = await this.contractGenerator.getFlattenedSourceCode(sourceCode);
      
      const contractName = config.tokenName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
      

      const constructor = abi.find(item => item.type === 'constructor');
      if (!constructor) {
        throw new Error('No se encontró el constructor en el ABI');
      }

      const abiCoder = new ethers.AbiCoder();
      const encodedArgs = abiCoder.encode(
        constructor.inputs.map((input: any) => input.type),
        constructorArgs  
      ).slice(2);

      console.log('Argumentos codificados:', encodedArgs);

      const submitResponse = await fetch(`${networkConfig.explorerUrl}?apikey=${networkConfig.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          apikey: networkConfig.apiKey,
          module: 'contract',
          action: 'verifysourcecode',
          sourceCode: flattenedCode,
          contractaddress: address,
          codeformat: 'solidity-single-file',
          contractname: contractName, 
          compilerversion: 'v0.8.20+commit.a1b79de6',
          optimizationUsed: '1',
          runs: '200',
          evmversion: 'paris',
          licenseType: '3',
          constructorArguements: encodedArgs,
          chainid: chainId.toString(),
        }).toString(),
      });

      const submitResult = await submitResponse.json();
      console.log('Respuesta de verificación:', submitResult);

      if (submitResult.status === '1') {
        const guid = submitResult.result;
        
        let verificationComplete = false;
        let attempts = 0;
        const maxAttempts = 10;

        while (!verificationComplete && attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 5000)); 

          const checkResponse = await fetch(`${networkConfig.explorerUrl}?apikey=${networkConfig.apiKey}&module=contract&action=checkverifystatus&guid=${guid}`);
          const checkResult = await checkResponse.json();

          if (checkResult.result === 'Pass - Verified') {
            console.log(`Contrato verificado exitosamente en ${networkConfig.name}`);
            verificationComplete = true;
          } else if (checkResult.result.includes('Fail')) {
            console.error(`Error en la verificación en ${networkConfig.name}:`, checkResult.result);
            verificationComplete = true;
          }

          attempts++;
        }

        if (!verificationComplete) {
          console.error(`Tiempo de espera agotado para la verificación en ${networkConfig.name}`);
        }
      } else {
        console.error(`Error al enviar la verificación en ${networkConfig.name}:`, submitResult.result);
      }
    } catch (error) {
      console.error('Error al verificar el contrato:', error);
    }
  }
}