import { IndexingServerDataAccessor } from "./dataaccessors/indexingServerDataAccessor";
import { client, clientBe } from '../services/dataaccessors/urql'
import { CaseAuthentication } from './usecases/caseAuthentication';
import { AuthService } from './auth/authService';
import { OffChainDataAccessor } from './dataaccessors/offChainDataAccessor';
import { CaseManageMerchants } from './usecases/caseManageMerchants';
import { CaseManageUsers } from "./usecases/caseManageUsers";

// import { AuthServiceFirebase } from './auth/authServiceFireBase';

let offChainDataAccessor = new OffChainDataAccessor({ clientBe })

let caseAuthentication = new CaseAuthentication({
    authService: new AuthService(clientBe),
    offChainDataAccessor
})

let caseManageMerchants = new CaseManageMerchants({
    offChainDataAccessor
})

let caseManageUsers = new CaseManageUsers({
    offChainDataAccessor
})

export { caseAuthentication, caseManageMerchants, caseManageUsers }