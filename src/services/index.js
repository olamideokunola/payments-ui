import { IndexingServerDataAccessor } from "./dataaccessors/indexingServerDataAccessor";
import { client as indexingServerClient, clientBe } from '../services/dataaccessors/urql'
import { CaseAuthentication } from './usecases/caseAuthentication';
import { AuthService } from './auth/authService';
import { OffChainDataAccessor } from './dataaccessors/offChainDataAccessor';
import { CaseManageMerchants } from './usecases/caseManageMerchants';
import { CaseManageUsers } from "./usecases/caseManageUsers";
import { CaseManageTraders } from './usecases/caseManageTraders'
import { ChainAccessor } from './dataaccessors/chainAccessor'
import { CaseManageTrades } from './usecases/caseManageTrades'
import { CaseAdmin } from './usecases/caseAdmin' 
import { CaseNetworks } from "./usecases/caseNetworks";

import { 
    PaymentContract as PaymentContractDefinition, 
    StableCoinForPayment as StableCoinForPaymentDefinition, 
    PancakeRouter as PancakeRouterDefinition, 
    tokensForPayment as tokensForPaymentDefinitions
} from '../app.config'

// Accessors
let indexingServerDataAccessor = new IndexingServerDataAccessor({ client: indexingServerClient })
let offChainDataAccessor = new OffChainDataAccessor({ clientBe })
let chainAccessor = new ChainAccessor({
    PaymentContractDefinition,
    StableCoinForPaymentDefinition,
    PancakeRouterDefinition,
    tokensForPaymentDefinitions
})

let caseAuthentication = new CaseAuthentication({
    authService: new AuthService(clientBe),
    offChainDataAccessor
})

let caseManageMerchants = new CaseManageMerchants({
    offChainDataAccessor,
    chainAccessor
})

let caseManageUsers = new CaseManageUsers({
    offChainDataAccessor
})

let caseManageTraders = new CaseManageTraders({
    offChainDataAccessor
})

let caseManageTrades = new CaseManageTrades({
    indexingServerDataAccessor
})

let caseAdmin = new CaseAdmin({
    chainAccessor
})

let caseNetworks = new CaseNetworks({
    indexingServerDataAccessor, chainAccessor
})

export { caseAuthentication, caseManageMerchants, caseManageUsers, caseManageTraders, caseManageTrades, caseAdmin, caseNetworks }