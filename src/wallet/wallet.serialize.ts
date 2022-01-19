import { Wallet } from "./entities/wallet.entity"

export class WalletSerialize {
    serialize(
        {address, name, cpf, birthdate, coins, createdAt, updatedAt} : Wallet
    ) : Wallet {
        return {name, cpf, birthdate, address, coins, createdAt, updatedAt} 
    }

    paginateSerialize ({items, meta}) : IPaginatedWallet {
        return { 
            wallets: items.map(this.serialize),
            total: meta.totalItems,
            limit: meta.itemsPerPage,
            offset: meta.currentPage,
            offsets: meta.totalPages} 
        }
    }

    export interface IPaginatedWallet {
        wallets: Wallet[]
        total: Number
        limit: Number
        offset: Number
        offsets: Number
    }
