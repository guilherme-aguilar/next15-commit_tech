
import { IPermission } from "../adapters/constants/permission";
import { AccountType } from "../adapters/constants/permissionTypes";
import { EBasic, IBasic } from "./00_basic";

export interface ICustomerProfile extends IBasic {
  name: string
  role: AccountType
  permission: IPermission[]
 }

 
export class ECustomerProfile extends EBasic<ICustomerProfile> {

  get name() {
    return this.getProps().name;
  }

  get role() {
    return this.getProps().role;
  }

  get permission() {
    return this.getProps().permission;
  }

  set permission(data: IPermission[]) {
    const currentRole = this.getProps().role;

    switch (currentRole) {
      case "owner":
        this.getProps().permission = data;
        break;

      case "admin":
        const adminPermission: IPermission[] = data.map(permission => {
          return {
            ...permission,
            conditions: [
              { field: "responsibleId", operator: "eq", value: "CustomerId" },
              { field: "id", operator: "eq", value: "CustomerId" },
              {
                field: "responsibleId",
                operator: "in",
                value: "Customer.responsibleFor" // Campo para representar os IDs do responsável
              }
            ]
          };
        });

        this.getProps().permission = adminPermission;
        break;

      case "tenant":
        const tenantPermission: IPermission[] = data.map(permission => {
          return {
            ...permission,
            conditions: [
              { field: "id", operator: "eq", value: "companyId" }
            ]
          };
        });

        this.getProps().permission = tenantPermission;
        break;

      default:
        throw new Error("Role não reconhecida");
    }
  }
}
