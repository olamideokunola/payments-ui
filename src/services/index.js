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

// import { AuthServiceFirebase } from './auth/authServiceFireBase';
let indexingServerDataAccessor = new IndexingServerDataAccessor({ client: indexingServerClient })
let offChainDataAccessor = new OffChainDataAccessor({ clientBe })
let chainAccessor = new ChainAccessor()

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


export { caseAuthentication, caseManageMerchants, caseManageUsers, caseManageTraders, caseManageTrades }