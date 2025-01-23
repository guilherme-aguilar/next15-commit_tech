import { Condition } from "./conditionsPermission";
import { Action, Subject } from "./permissionTypes";

// Definindo a interface de permissão
export interface IPermission {
  action: Action;
  subject: Subject;
  fields?: string[];
  conditions?: Condition[]; // Condições como um array de objetos
}

