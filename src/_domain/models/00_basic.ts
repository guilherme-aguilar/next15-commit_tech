
import { createId as cuid } from "@paralleldrive/cuid2";
import { Replace } from "../helpers/replace";

export interface IBasic{
  id?: string;
  idx?: number;
  createdAt: Date;
  disabledAt?: Date;
  updatedAt?: Date;
}

export interface IGenericKeysDefault {
    disable?: () => void,
    enable?: () => void,
    getProps?: () => any,
    updateProperties?: (props: any) => void,
    serialize?: () => any,
}

type ProxyHandler<T extends IBasic> = {
  get(target: EBasic<T>, prop: string | symbol): any;
};

type PropertyValue = Date | unknown[] | object | string | number | boolean | null;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export abstract class EBasic<T extends IBasic> {
  protected readonly _id: string;
  protected readonly _idx: number | undefined;
  protected props: T;

  constructor(
    props: Replace<T, { createdAt?: Date }>,
    id?: string,
    idx?: number
  ) {
    this._id = id ?? cuid();
    this._idx = idx;
    this.props = this.initializeProps(props);
    return this.createProxy();
  }

  private initializeProps(props: Replace<T, { createdAt?: Date }>): T {
    return {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      disabledAt: props.disabledAt ?? null,
      updatedAt: props.updatedAt ?? null,
    } as T;
  }

  private createProxy(): EBasic<T> {
    const handler: ProxyHandler<T> = {
      get: (target, prop) => {
        if (prop in target.props) {
          return target.props[prop as keyof T];
        }
        return (target as any)[prop];
      },
    };
    return new Proxy(this, handler);
  }

  get id(): string {
    return this._id;
  }

  get idx(): number | undefined {
    return this._idx;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get disabledAt(): Date | null {
    return this.props.disabledAt;
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  disable(): void {
    const dateAction = new Date();
    this.updateTimestamps(dateAction, dateAction);
  }

  enable(): void {
    this.updateTimestamps(null, new Date());
  }

  private updateTimestamps(disabledAt: Date | null, updatedAt: Date): void {
    this.props.disabledAt = disabledAt;
    this.props.updatedAt = updatedAt;
  }

  getProps(): T {
    return this.props;
  }

  updateProperties(properties: DeepPartial<Omit<T, keyof IBasic>>): this {
    const validProperties = this.filterValidProperties(properties as any);
    this.mergeProperties(validProperties as DeepPartial<T>);
    this.props.updatedAt = new Date();
    return this;
  }

  private filterValidProperties(properties: Record<string, PropertyValue>): Record<string, PropertyValue> {
    return Object.fromEntries(
      Object.entries(properties).filter(([_, value]) => this.isValidValue(value))
    );
  }

  private isValidValue(value: PropertyValue): boolean {
    switch (true) {
      case value === undefined:
      case value === "":
      case value === null:
        return false;
      
      case value instanceof Date:
      case Array.isArray(value):
      case typeof value !== "object":
        return true;
      
      default:
        return true; // Permitir objetos vazios para atualizações parciais
    }
  }

  private mergeProperties(properties: DeepPartial<T>): void {
    Object.entries(properties).forEach(([key, value]) => {
      const propertyKey = key as keyof T;
      this.updateProperty(propertyKey, value);
    });
  }

  private updateProperty(key: keyof T, value: unknown): void {
    switch (true) {
      case value instanceof Date:
        this.updateDateProperty(key, value as Date);
        break;
      
      case Array.isArray(value):
        this.updateArrayProperty(key, value);
        break;
      
      case this.isNestedObject(value, key):
        this.updateNestedObjectProperty(key, value as object);
        break;
      
      default:
        this.updateSimpleProperty(key, value);
    }
  }

  private updateDateProperty(key: keyof T, value: Date): void {
    (this.props[key] as unknown) = new Date(value);
  }

  private updateArrayProperty(key: keyof T, value: unknown[]): void {
    (this.props[key] as unknown[]) = [...value];
  }

  private updateNestedObjectProperty(key: keyof T, value: object): void {
    const currentValue = this.props[key] as object;
    if (!currentValue) {
      (this.props[key] as object) = value;
      return;
    }

    (this.props[key] as object) = this.deepMerge(currentValue, value);
  }

  private deepMerge(target: object, source: object): object {
    const output = { ...target };
    
    for (const key in source) {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (this.isPlainObject(sourceValue) && this.isPlainObject(targetValue)) {
        output[key] = this.deepMerge(targetValue, sourceValue);
      } else if (sourceValue !== undefined) {
        output[key] = sourceValue;
      }
    }

    return output;
  }

  private isPlainObject(value: unknown): value is object {
    return typeof value === 'object' && 
           value !== null && 
           !Array.isArray(value) && 
           !(value instanceof Date);
  }

  private updateSimpleProperty(key: keyof T, value: unknown): void {
    this.props[key] = value as T[keyof T];
  }

  private isNestedObject(value: unknown, key: keyof T): boolean {
    return this.isPlainObject(value) && this.isPlainObject(this.props[key]);
  }

  serialize(): T & { id: string; idx?: number } {
    return {
      id: this.id,
      idx: this.idx,
      ...this.props,
    };
  }
}