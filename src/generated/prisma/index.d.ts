
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model RolePermission
 * 
 */
export type RolePermission = $Result.DefaultSelection<Prisma.$RolePermissionPayload>
/**
 * Model Garden
 * 
 */
export type Garden = $Result.DefaultSelection<Prisma.$GardenPayload>
/**
 * Model FertilizerType
 * 
 */
export type FertilizerType = $Result.DefaultSelection<Prisma.$FertilizerTypePayload>
/**
 * Model Supplier
 * 
 */
export type Supplier = $Result.DefaultSelection<Prisma.$SupplierPayload>
/**
 * Model SupplyOrder
 * 
 */
export type SupplyOrder = $Result.DefaultSelection<Prisma.$SupplyOrderPayload>
/**
 * Model DeliveryReceipt
 * 
 */
export type DeliveryReceipt = $Result.DefaultSelection<Prisma.$DeliveryReceiptPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  KRANI_TANAMAN: 'KRANI_TANAMAN',
  KRANI_KEBUN: 'KRANI_KEBUN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const SupplyBudgetType: {
  EKSPLOITASI: 'EKSPLOITASI',
  INVESTASI: 'INVESTASI'
};

export type SupplyBudgetType = (typeof SupplyBudgetType)[keyof typeof SupplyBudgetType]


export const GardenAccessScope: {
  NONE: 'NONE',
  ASSIGNED: 'ASSIGNED',
  ALL: 'ALL'
};

export type GardenAccessScope = (typeof GardenAccessScope)[keyof typeof GardenAccessScope]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type SupplyBudgetType = $Enums.SupplyBudgetType

export const SupplyBudgetType: typeof $Enums.SupplyBudgetType

export type GardenAccessScope = $Enums.GardenAccessScope

export const GardenAccessScope: typeof $Enums.GardenAccessScope

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rolePermission`: Exposes CRUD operations for the **RolePermission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RolePermissions
    * const rolePermissions = await prisma.rolePermission.findMany()
    * ```
    */
  get rolePermission(): Prisma.RolePermissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.garden`: Exposes CRUD operations for the **Garden** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Gardens
    * const gardens = await prisma.garden.findMany()
    * ```
    */
  get garden(): Prisma.GardenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fertilizerType`: Exposes CRUD operations for the **FertilizerType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FertilizerTypes
    * const fertilizerTypes = await prisma.fertilizerType.findMany()
    * ```
    */
  get fertilizerType(): Prisma.FertilizerTypeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.supplier`: Exposes CRUD operations for the **Supplier** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Suppliers
    * const suppliers = await prisma.supplier.findMany()
    * ```
    */
  get supplier(): Prisma.SupplierDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.supplyOrder`: Exposes CRUD operations for the **SupplyOrder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SupplyOrders
    * const supplyOrders = await prisma.supplyOrder.findMany()
    * ```
    */
  get supplyOrder(): Prisma.SupplyOrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.deliveryReceipt`: Exposes CRUD operations for the **DeliveryReceipt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DeliveryReceipts
    * const deliveryReceipts = await prisma.deliveryReceipt.findMany()
    * ```
    */
  get deliveryReceipt(): Prisma.DeliveryReceiptDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.6.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    RolePermission: 'RolePermission',
    Garden: 'Garden',
    FertilizerType: 'FertilizerType',
    Supplier: 'Supplier',
    SupplyOrder: 'SupplyOrder',
    DeliveryReceipt: 'DeliveryReceipt'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "rolePermission" | "garden" | "fertilizerType" | "supplier" | "supplyOrder" | "deliveryReceipt"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      RolePermission: {
        payload: Prisma.$RolePermissionPayload<ExtArgs>
        fields: Prisma.RolePermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RolePermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RolePermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          findFirst: {
            args: Prisma.RolePermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RolePermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          findMany: {
            args: Prisma.RolePermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>[]
          }
          create: {
            args: Prisma.RolePermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          createMany: {
            args: Prisma.RolePermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RolePermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>[]
          }
          delete: {
            args: Prisma.RolePermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          update: {
            args: Prisma.RolePermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          deleteMany: {
            args: Prisma.RolePermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RolePermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RolePermissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>[]
          }
          upsert: {
            args: Prisma.RolePermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          aggregate: {
            args: Prisma.RolePermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRolePermission>
          }
          groupBy: {
            args: Prisma.RolePermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RolePermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RolePermissionCountArgs<ExtArgs>
            result: $Utils.Optional<RolePermissionCountAggregateOutputType> | number
          }
        }
      }
      Garden: {
        payload: Prisma.$GardenPayload<ExtArgs>
        fields: Prisma.GardenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GardenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GardenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GardenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GardenPayload>
          }
          findFirst: {
            args: Prisma.GardenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GardenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GardenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GardenPayload>
          }
          findMany: {
            args: Prisma.GardenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GardenPayload>[]
          }
          create: {
            args: Prisma.GardenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GardenPayload>
          }
          createMany: {
            args: Prisma.GardenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GardenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GardenPayload>[]
          }
          delete: {
            args: Prisma.GardenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GardenPayload>
          }
          update: {
            args: Prisma.GardenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GardenPayload>
          }
          deleteMany: {
            args: Prisma.GardenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GardenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GardenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GardenPayload>[]
          }
          upsert: {
            args: Prisma.GardenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GardenPayload>
          }
          aggregate: {
            args: Prisma.GardenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGarden>
          }
          groupBy: {
            args: Prisma.GardenGroupByArgs<ExtArgs>
            result: $Utils.Optional<GardenGroupByOutputType>[]
          }
          count: {
            args: Prisma.GardenCountArgs<ExtArgs>
            result: $Utils.Optional<GardenCountAggregateOutputType> | number
          }
        }
      }
      FertilizerType: {
        payload: Prisma.$FertilizerTypePayload<ExtArgs>
        fields: Prisma.FertilizerTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FertilizerTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FertilizerTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FertilizerTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FertilizerTypePayload>
          }
          findFirst: {
            args: Prisma.FertilizerTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FertilizerTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FertilizerTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FertilizerTypePayload>
          }
          findMany: {
            args: Prisma.FertilizerTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FertilizerTypePayload>[]
          }
          create: {
            args: Prisma.FertilizerTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FertilizerTypePayload>
          }
          createMany: {
            args: Prisma.FertilizerTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FertilizerTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FertilizerTypePayload>[]
          }
          delete: {
            args: Prisma.FertilizerTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FertilizerTypePayload>
          }
          update: {
            args: Prisma.FertilizerTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FertilizerTypePayload>
          }
          deleteMany: {
            args: Prisma.FertilizerTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FertilizerTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FertilizerTypeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FertilizerTypePayload>[]
          }
          upsert: {
            args: Prisma.FertilizerTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FertilizerTypePayload>
          }
          aggregate: {
            args: Prisma.FertilizerTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFertilizerType>
          }
          groupBy: {
            args: Prisma.FertilizerTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<FertilizerTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.FertilizerTypeCountArgs<ExtArgs>
            result: $Utils.Optional<FertilizerTypeCountAggregateOutputType> | number
          }
        }
      }
      Supplier: {
        payload: Prisma.$SupplierPayload<ExtArgs>
        fields: Prisma.SupplierFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupplierFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupplierFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          findFirst: {
            args: Prisma.SupplierFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupplierFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          findMany: {
            args: Prisma.SupplierFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>[]
          }
          create: {
            args: Prisma.SupplierCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          createMany: {
            args: Prisma.SupplierCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SupplierCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>[]
          }
          delete: {
            args: Prisma.SupplierDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          update: {
            args: Prisma.SupplierUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          deleteMany: {
            args: Prisma.SupplierDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupplierUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SupplierUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>[]
          }
          upsert: {
            args: Prisma.SupplierUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          aggregate: {
            args: Prisma.SupplierAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupplier>
          }
          groupBy: {
            args: Prisma.SupplierGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupplierGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupplierCountArgs<ExtArgs>
            result: $Utils.Optional<SupplierCountAggregateOutputType> | number
          }
        }
      }
      SupplyOrder: {
        payload: Prisma.$SupplyOrderPayload<ExtArgs>
        fields: Prisma.SupplyOrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupplyOrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplyOrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupplyOrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplyOrderPayload>
          }
          findFirst: {
            args: Prisma.SupplyOrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplyOrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupplyOrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplyOrderPayload>
          }
          findMany: {
            args: Prisma.SupplyOrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplyOrderPayload>[]
          }
          create: {
            args: Prisma.SupplyOrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplyOrderPayload>
          }
          createMany: {
            args: Prisma.SupplyOrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SupplyOrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplyOrderPayload>[]
          }
          delete: {
            args: Prisma.SupplyOrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplyOrderPayload>
          }
          update: {
            args: Prisma.SupplyOrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplyOrderPayload>
          }
          deleteMany: {
            args: Prisma.SupplyOrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupplyOrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SupplyOrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplyOrderPayload>[]
          }
          upsert: {
            args: Prisma.SupplyOrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplyOrderPayload>
          }
          aggregate: {
            args: Prisma.SupplyOrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupplyOrder>
          }
          groupBy: {
            args: Prisma.SupplyOrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupplyOrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupplyOrderCountArgs<ExtArgs>
            result: $Utils.Optional<SupplyOrderCountAggregateOutputType> | number
          }
        }
      }
      DeliveryReceipt: {
        payload: Prisma.$DeliveryReceiptPayload<ExtArgs>
        fields: Prisma.DeliveryReceiptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeliveryReceiptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryReceiptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeliveryReceiptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryReceiptPayload>
          }
          findFirst: {
            args: Prisma.DeliveryReceiptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryReceiptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeliveryReceiptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryReceiptPayload>
          }
          findMany: {
            args: Prisma.DeliveryReceiptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryReceiptPayload>[]
          }
          create: {
            args: Prisma.DeliveryReceiptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryReceiptPayload>
          }
          createMany: {
            args: Prisma.DeliveryReceiptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeliveryReceiptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryReceiptPayload>[]
          }
          delete: {
            args: Prisma.DeliveryReceiptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryReceiptPayload>
          }
          update: {
            args: Prisma.DeliveryReceiptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryReceiptPayload>
          }
          deleteMany: {
            args: Prisma.DeliveryReceiptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeliveryReceiptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeliveryReceiptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryReceiptPayload>[]
          }
          upsert: {
            args: Prisma.DeliveryReceiptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryReceiptPayload>
          }
          aggregate: {
            args: Prisma.DeliveryReceiptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeliveryReceipt>
          }
          groupBy: {
            args: Prisma.DeliveryReceiptGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeliveryReceiptGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeliveryReceiptCountArgs<ExtArgs>
            result: $Utils.Optional<DeliveryReceiptCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    rolePermission?: RolePermissionOmit
    garden?: GardenOmit
    fertilizerType?: FertilizerTypeOmit
    supplier?: SupplierOmit
    supplyOrder?: SupplyOrderOmit
    deliveryReceipt?: DeliveryReceiptOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    createdSupply: number
    createdDeliveries: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdSupply?: boolean | UserCountOutputTypeCountCreatedSupplyArgs
    createdDeliveries?: boolean | UserCountOutputTypeCountCreatedDeliveriesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedSupplyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupplyOrderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedDeliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeliveryReceiptWhereInput
  }


  /**
   * Count Type GardenCountOutputType
   */

  export type GardenCountOutputType = {
    supplyOrders: number
    assignedUsers: number
  }

  export type GardenCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supplyOrders?: boolean | GardenCountOutputTypeCountSupplyOrdersArgs
    assignedUsers?: boolean | GardenCountOutputTypeCountAssignedUsersArgs
  }

  // Custom InputTypes
  /**
   * GardenCountOutputType without action
   */
  export type GardenCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GardenCountOutputType
     */
    select?: GardenCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GardenCountOutputType without action
   */
  export type GardenCountOutputTypeCountSupplyOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupplyOrderWhereInput
  }

  /**
   * GardenCountOutputType without action
   */
  export type GardenCountOutputTypeCountAssignedUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type FertilizerTypeCountOutputType
   */

  export type FertilizerTypeCountOutputType = {
    supplyOrders: number
  }

  export type FertilizerTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supplyOrders?: boolean | FertilizerTypeCountOutputTypeCountSupplyOrdersArgs
  }

  // Custom InputTypes
  /**
   * FertilizerTypeCountOutputType without action
   */
  export type FertilizerTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FertilizerTypeCountOutputType
     */
    select?: FertilizerTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FertilizerTypeCountOutputType without action
   */
  export type FertilizerTypeCountOutputTypeCountSupplyOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupplyOrderWhereInput
  }


  /**
   * Count Type SupplierCountOutputType
   */

  export type SupplierCountOutputType = {
    supplyOrders: number
  }

  export type SupplierCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supplyOrders?: boolean | SupplierCountOutputTypeCountSupplyOrdersArgs
  }

  // Custom InputTypes
  /**
   * SupplierCountOutputType without action
   */
  export type SupplierCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierCountOutputType
     */
    select?: SupplierCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SupplierCountOutputType without action
   */
  export type SupplierCountOutputTypeCountSupplyOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupplyOrderWhereInput
  }


  /**
   * Count Type SupplyOrderCountOutputType
   */

  export type SupplyOrderCountOutputType = {
    deliveries: number
  }

  export type SupplyOrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deliveries?: boolean | SupplyOrderCountOutputTypeCountDeliveriesArgs
  }

  // Custom InputTypes
  /**
   * SupplyOrderCountOutputType without action
   */
  export type SupplyOrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplyOrderCountOutputType
     */
    select?: SupplyOrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SupplyOrderCountOutputType without action
   */
  export type SupplyOrderCountOutputTypeCountDeliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeliveryReceiptWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    isActive: boolean | null
    assignedGardenId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    isActive: boolean | null
    assignedGardenId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    passwordHash: number
    role: number
    isActive: number
    assignedGardenId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    isActive?: true
    assignedGardenId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    isActive?: true
    assignedGardenId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    isActive?: true
    assignedGardenId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    isActive: boolean
    assignedGardenId: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    assignedGardenId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignedGarden?: boolean | User$assignedGardenArgs<ExtArgs>
    createdSupply?: boolean | User$createdSupplyArgs<ExtArgs>
    createdDeliveries?: boolean | User$createdDeliveriesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    assignedGardenId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignedGarden?: boolean | User$assignedGardenArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    assignedGardenId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignedGarden?: boolean | User$assignedGardenArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    assignedGardenId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "passwordHash" | "role" | "isActive" | "assignedGardenId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignedGarden?: boolean | User$assignedGardenArgs<ExtArgs>
    createdSupply?: boolean | User$createdSupplyArgs<ExtArgs>
    createdDeliveries?: boolean | User$createdDeliveriesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignedGarden?: boolean | User$assignedGardenArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignedGarden?: boolean | User$assignedGardenArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      assignedGarden: Prisma.$GardenPayload<ExtArgs> | null
      createdSupply: Prisma.$SupplyOrderPayload<ExtArgs>[]
      createdDeliveries: Prisma.$DeliveryReceiptPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      passwordHash: string
      role: $Enums.UserRole
      isActive: boolean
      assignedGardenId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assignedGarden<T extends User$assignedGardenArgs<ExtArgs> = {}>(args?: Subset<T, User$assignedGardenArgs<ExtArgs>>): Prisma__GardenClient<$Result.GetResult<Prisma.$GardenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    createdSupply<T extends User$createdSupplyArgs<ExtArgs> = {}>(args?: Subset<T, User$createdSupplyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplyOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdDeliveries<T extends User$createdDeliveriesArgs<ExtArgs> = {}>(args?: Subset<T, User$createdDeliveriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly assignedGardenId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.assignedGarden
   */
  export type User$assignedGardenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garden
     */
    select?: GardenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Garden
     */
    omit?: GardenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GardenInclude<ExtArgs> | null
    where?: GardenWhereInput
  }

  /**
   * User.createdSupply
   */
  export type User$createdSupplyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplyOrder
     */
    select?: SupplyOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplyOrder
     */
    omit?: SupplyOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyOrderInclude<ExtArgs> | null
    where?: SupplyOrderWhereInput
    orderBy?: SupplyOrderOrderByWithRelationInput | SupplyOrderOrderByWithRelationInput[]
    cursor?: SupplyOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SupplyOrderScalarFieldEnum | SupplyOrderScalarFieldEnum[]
  }

  /**
   * User.createdDeliveries
   */
  export type User$createdDeliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryReceiptInclude<ExtArgs> | null
    where?: DeliveryReceiptWhereInput
    orderBy?: DeliveryReceiptOrderByWithRelationInput | DeliveryReceiptOrderByWithRelationInput[]
    cursor?: DeliveryReceiptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeliveryReceiptScalarFieldEnum | DeliveryReceiptScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model RolePermission
   */

  export type AggregateRolePermission = {
    _count: RolePermissionCountAggregateOutputType | null
    _min: RolePermissionMinAggregateOutputType | null
    _max: RolePermissionMaxAggregateOutputType | null
  }

  export type RolePermissionMinAggregateOutputType = {
    role: $Enums.UserRole | null
    gardenViewScope: $Enums.GardenAccessScope | null
    gardenEditScope: $Enums.GardenAccessScope | null
    gardenDeleteScope: $Enums.GardenAccessScope | null
    canAccessAdminHome: boolean | null
    canAccessSupplyInput: boolean | null
    canAccessSupplyList: boolean | null
    canAccessMasterGardens: boolean | null
    canAccessMasterFertilizers: boolean | null
    canAccessMasterSuppliers: boolean | null
    canAccessSupplierInformation: boolean | null
    canAccessUserManagement: boolean | null
    canAccessAdminDelivery: boolean | null
    canAccessKraniHome: boolean | null
    canAccessDeliveryWorkspace: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RolePermissionMaxAggregateOutputType = {
    role: $Enums.UserRole | null
    gardenViewScope: $Enums.GardenAccessScope | null
    gardenEditScope: $Enums.GardenAccessScope | null
    gardenDeleteScope: $Enums.GardenAccessScope | null
    canAccessAdminHome: boolean | null
    canAccessSupplyInput: boolean | null
    canAccessSupplyList: boolean | null
    canAccessMasterGardens: boolean | null
    canAccessMasterFertilizers: boolean | null
    canAccessMasterSuppliers: boolean | null
    canAccessSupplierInformation: boolean | null
    canAccessUserManagement: boolean | null
    canAccessAdminDelivery: boolean | null
    canAccessKraniHome: boolean | null
    canAccessDeliveryWorkspace: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RolePermissionCountAggregateOutputType = {
    role: number
    gardenViewScope: number
    gardenEditScope: number
    gardenDeleteScope: number
    canAccessAdminHome: number
    canAccessSupplyInput: number
    canAccessSupplyList: number
    canAccessMasterGardens: number
    canAccessMasterFertilizers: number
    canAccessMasterSuppliers: number
    canAccessSupplierInformation: number
    canAccessUserManagement: number
    canAccessAdminDelivery: number
    canAccessKraniHome: number
    canAccessDeliveryWorkspace: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RolePermissionMinAggregateInputType = {
    role?: true
    gardenViewScope?: true
    gardenEditScope?: true
    gardenDeleteScope?: true
    canAccessAdminHome?: true
    canAccessSupplyInput?: true
    canAccessSupplyList?: true
    canAccessMasterGardens?: true
    canAccessMasterFertilizers?: true
    canAccessMasterSuppliers?: true
    canAccessSupplierInformation?: true
    canAccessUserManagement?: true
    canAccessAdminDelivery?: true
    canAccessKraniHome?: true
    canAccessDeliveryWorkspace?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RolePermissionMaxAggregateInputType = {
    role?: true
    gardenViewScope?: true
    gardenEditScope?: true
    gardenDeleteScope?: true
    canAccessAdminHome?: true
    canAccessSupplyInput?: true
    canAccessSupplyList?: true
    canAccessMasterGardens?: true
    canAccessMasterFertilizers?: true
    canAccessMasterSuppliers?: true
    canAccessSupplierInformation?: true
    canAccessUserManagement?: true
    canAccessAdminDelivery?: true
    canAccessKraniHome?: true
    canAccessDeliveryWorkspace?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RolePermissionCountAggregateInputType = {
    role?: true
    gardenViewScope?: true
    gardenEditScope?: true
    gardenDeleteScope?: true
    canAccessAdminHome?: true
    canAccessSupplyInput?: true
    canAccessSupplyList?: true
    canAccessMasterGardens?: true
    canAccessMasterFertilizers?: true
    canAccessMasterSuppliers?: true
    canAccessSupplierInformation?: true
    canAccessUserManagement?: true
    canAccessAdminDelivery?: true
    canAccessKraniHome?: true
    canAccessDeliveryWorkspace?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RolePermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RolePermission to aggregate.
     */
    where?: RolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RolePermissions
    **/
    _count?: true | RolePermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RolePermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RolePermissionMaxAggregateInputType
  }

  export type GetRolePermissionAggregateType<T extends RolePermissionAggregateArgs> = {
        [P in keyof T & keyof AggregateRolePermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRolePermission[P]>
      : GetScalarType<T[P], AggregateRolePermission[P]>
  }




  export type RolePermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolePermissionWhereInput
    orderBy?: RolePermissionOrderByWithAggregationInput | RolePermissionOrderByWithAggregationInput[]
    by: RolePermissionScalarFieldEnum[] | RolePermissionScalarFieldEnum
    having?: RolePermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RolePermissionCountAggregateInputType | true
    _min?: RolePermissionMinAggregateInputType
    _max?: RolePermissionMaxAggregateInputType
  }

  export type RolePermissionGroupByOutputType = {
    role: $Enums.UserRole
    gardenViewScope: $Enums.GardenAccessScope
    gardenEditScope: $Enums.GardenAccessScope
    gardenDeleteScope: $Enums.GardenAccessScope
    canAccessAdminHome: boolean
    canAccessSupplyInput: boolean
    canAccessSupplyList: boolean
    canAccessMasterGardens: boolean
    canAccessMasterFertilizers: boolean
    canAccessMasterSuppliers: boolean
    canAccessSupplierInformation: boolean
    canAccessUserManagement: boolean
    canAccessAdminDelivery: boolean
    canAccessKraniHome: boolean
    canAccessDeliveryWorkspace: boolean
    createdAt: Date
    updatedAt: Date
    _count: RolePermissionCountAggregateOutputType | null
    _min: RolePermissionMinAggregateOutputType | null
    _max: RolePermissionMaxAggregateOutputType | null
  }

  type GetRolePermissionGroupByPayload<T extends RolePermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RolePermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RolePermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RolePermissionGroupByOutputType[P]>
            : GetScalarType<T[P], RolePermissionGroupByOutputType[P]>
        }
      >
    >


  export type RolePermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    role?: boolean
    gardenViewScope?: boolean
    gardenEditScope?: boolean
    gardenDeleteScope?: boolean
    canAccessAdminHome?: boolean
    canAccessSupplyInput?: boolean
    canAccessSupplyList?: boolean
    canAccessMasterGardens?: boolean
    canAccessMasterFertilizers?: boolean
    canAccessMasterSuppliers?: boolean
    canAccessSupplierInformation?: boolean
    canAccessUserManagement?: boolean
    canAccessAdminDelivery?: boolean
    canAccessKraniHome?: boolean
    canAccessDeliveryWorkspace?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["rolePermission"]>

  export type RolePermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    role?: boolean
    gardenViewScope?: boolean
    gardenEditScope?: boolean
    gardenDeleteScope?: boolean
    canAccessAdminHome?: boolean
    canAccessSupplyInput?: boolean
    canAccessSupplyList?: boolean
    canAccessMasterGardens?: boolean
    canAccessMasterFertilizers?: boolean
    canAccessMasterSuppliers?: boolean
    canAccessSupplierInformation?: boolean
    canAccessUserManagement?: boolean
    canAccessAdminDelivery?: boolean
    canAccessKraniHome?: boolean
    canAccessDeliveryWorkspace?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["rolePermission"]>

  export type RolePermissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    role?: boolean
    gardenViewScope?: boolean
    gardenEditScope?: boolean
    gardenDeleteScope?: boolean
    canAccessAdminHome?: boolean
    canAccessSupplyInput?: boolean
    canAccessSupplyList?: boolean
    canAccessMasterGardens?: boolean
    canAccessMasterFertilizers?: boolean
    canAccessMasterSuppliers?: boolean
    canAccessSupplierInformation?: boolean
    canAccessUserManagement?: boolean
    canAccessAdminDelivery?: boolean
    canAccessKraniHome?: boolean
    canAccessDeliveryWorkspace?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["rolePermission"]>

  export type RolePermissionSelectScalar = {
    role?: boolean
    gardenViewScope?: boolean
    gardenEditScope?: boolean
    gardenDeleteScope?: boolean
    canAccessAdminHome?: boolean
    canAccessSupplyInput?: boolean
    canAccessSupplyList?: boolean
    canAccessMasterGardens?: boolean
    canAccessMasterFertilizers?: boolean
    canAccessMasterSuppliers?: boolean
    canAccessSupplierInformation?: boolean
    canAccessUserManagement?: boolean
    canAccessAdminDelivery?: boolean
    canAccessKraniHome?: boolean
    canAccessDeliveryWorkspace?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RolePermissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"role" | "gardenViewScope" | "gardenEditScope" | "gardenDeleteScope" | "canAccessAdminHome" | "canAccessSupplyInput" | "canAccessSupplyList" | "canAccessMasterGardens" | "canAccessMasterFertilizers" | "canAccessMasterSuppliers" | "canAccessSupplierInformation" | "canAccessUserManagement" | "canAccessAdminDelivery" | "canAccessKraniHome" | "canAccessDeliveryWorkspace" | "createdAt" | "updatedAt", ExtArgs["result"]["rolePermission"]>

  export type $RolePermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RolePermission"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      role: $Enums.UserRole
      gardenViewScope: $Enums.GardenAccessScope
      gardenEditScope: $Enums.GardenAccessScope
      gardenDeleteScope: $Enums.GardenAccessScope
      canAccessAdminHome: boolean
      canAccessSupplyInput: boolean
      canAccessSupplyList: boolean
      canAccessMasterGardens: boolean
      canAccessMasterFertilizers: boolean
      canAccessMasterSuppliers: boolean
      canAccessSupplierInformation: boolean
      canAccessUserManagement: boolean
      canAccessAdminDelivery: boolean
      canAccessKraniHome: boolean
      canAccessDeliveryWorkspace: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["rolePermission"]>
    composites: {}
  }

  type RolePermissionGetPayload<S extends boolean | null | undefined | RolePermissionDefaultArgs> = $Result.GetResult<Prisma.$RolePermissionPayload, S>

  type RolePermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RolePermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RolePermissionCountAggregateInputType | true
    }

  export interface RolePermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RolePermission'], meta: { name: 'RolePermission' } }
    /**
     * Find zero or one RolePermission that matches the filter.
     * @param {RolePermissionFindUniqueArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RolePermissionFindUniqueArgs>(args: SelectSubset<T, RolePermissionFindUniqueArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RolePermission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RolePermissionFindUniqueOrThrowArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RolePermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, RolePermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RolePermission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionFindFirstArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RolePermissionFindFirstArgs>(args?: SelectSubset<T, RolePermissionFindFirstArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RolePermission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionFindFirstOrThrowArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RolePermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, RolePermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RolePermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RolePermissions
     * const rolePermissions = await prisma.rolePermission.findMany()
     * 
     * // Get first 10 RolePermissions
     * const rolePermissions = await prisma.rolePermission.findMany({ take: 10 })
     * 
     * // Only select the `canAccessAdminHome`
     * const rolePermissionWithCanAccessAdminHomeOnly = await prisma.rolePermission.findMany({ select: { canAccessAdminHome: true } })
     * 
     */
    findMany<T extends RolePermissionFindManyArgs>(args?: SelectSubset<T, RolePermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RolePermission.
     * @param {RolePermissionCreateArgs} args - Arguments to create a RolePermission.
     * @example
     * // Create one RolePermission
     * const RolePermission = await prisma.rolePermission.create({
     *   data: {
     *     // ... data to create a RolePermission
     *   }
     * })
     * 
     */
    create<T extends RolePermissionCreateArgs>(args: SelectSubset<T, RolePermissionCreateArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RolePermissions.
     * @param {RolePermissionCreateManyArgs} args - Arguments to create many RolePermissions.
     * @example
     * // Create many RolePermissions
     * const rolePermission = await prisma.rolePermission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RolePermissionCreateManyArgs>(args?: SelectSubset<T, RolePermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RolePermissions and returns the data saved in the database.
     * @param {RolePermissionCreateManyAndReturnArgs} args - Arguments to create many RolePermissions.
     * @example
     * // Create many RolePermissions
     * const rolePermission = await prisma.rolePermission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RolePermissions and only return the `canAccessAdminHome`
     * const rolePermissionWithCanAccessAdminHomeOnly = await prisma.rolePermission.createManyAndReturn({
     *   select: { canAccessAdminHome: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RolePermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, RolePermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RolePermission.
     * @param {RolePermissionDeleteArgs} args - Arguments to delete one RolePermission.
     * @example
     * // Delete one RolePermission
     * const RolePermission = await prisma.rolePermission.delete({
     *   where: {
     *     // ... filter to delete one RolePermission
     *   }
     * })
     * 
     */
    delete<T extends RolePermissionDeleteArgs>(args: SelectSubset<T, RolePermissionDeleteArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RolePermission.
     * @param {RolePermissionUpdateArgs} args - Arguments to update one RolePermission.
     * @example
     * // Update one RolePermission
     * const rolePermission = await prisma.rolePermission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RolePermissionUpdateArgs>(args: SelectSubset<T, RolePermissionUpdateArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RolePermissions.
     * @param {RolePermissionDeleteManyArgs} args - Arguments to filter RolePermissions to delete.
     * @example
     * // Delete a few RolePermissions
     * const { count } = await prisma.rolePermission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RolePermissionDeleteManyArgs>(args?: SelectSubset<T, RolePermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RolePermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RolePermissions
     * const rolePermission = await prisma.rolePermission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RolePermissionUpdateManyArgs>(args: SelectSubset<T, RolePermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RolePermissions and returns the data updated in the database.
     * @param {RolePermissionUpdateManyAndReturnArgs} args - Arguments to update many RolePermissions.
     * @example
     * // Update many RolePermissions
     * const rolePermission = await prisma.rolePermission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RolePermissions and only return the `canAccessAdminHome`
     * const rolePermissionWithCanAccessAdminHomeOnly = await prisma.rolePermission.updateManyAndReturn({
     *   select: { canAccessAdminHome: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RolePermissionUpdateManyAndReturnArgs>(args: SelectSubset<T, RolePermissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RolePermission.
     * @param {RolePermissionUpsertArgs} args - Arguments to update or create a RolePermission.
     * @example
     * // Update or create a RolePermission
     * const rolePermission = await prisma.rolePermission.upsert({
     *   create: {
     *     // ... data to create a RolePermission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RolePermission we want to update
     *   }
     * })
     */
    upsert<T extends RolePermissionUpsertArgs>(args: SelectSubset<T, RolePermissionUpsertArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RolePermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionCountArgs} args - Arguments to filter RolePermissions to count.
     * @example
     * // Count the number of RolePermissions
     * const count = await prisma.rolePermission.count({
     *   where: {
     *     // ... the filter for the RolePermissions we want to count
     *   }
     * })
    **/
    count<T extends RolePermissionCountArgs>(
      args?: Subset<T, RolePermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RolePermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RolePermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RolePermissionAggregateArgs>(args: Subset<T, RolePermissionAggregateArgs>): Prisma.PrismaPromise<GetRolePermissionAggregateType<T>>

    /**
     * Group by RolePermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RolePermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RolePermissionGroupByArgs['orderBy'] }
        : { orderBy?: RolePermissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RolePermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRolePermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RolePermission model
   */
  readonly fields: RolePermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RolePermission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RolePermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RolePermission model
   */
  interface RolePermissionFieldRefs {
    readonly role: FieldRef<"RolePermission", 'UserRole'>
    readonly gardenViewScope: FieldRef<"RolePermission", 'GardenAccessScope'>
    readonly gardenEditScope: FieldRef<"RolePermission", 'GardenAccessScope'>
    readonly gardenDeleteScope: FieldRef<"RolePermission", 'GardenAccessScope'>
    readonly canAccessAdminHome: FieldRef<"RolePermission", 'Boolean'>
    readonly canAccessSupplyInput: FieldRef<"RolePermission", 'Boolean'>
    readonly canAccessSupplyList: FieldRef<"RolePermission", 'Boolean'>
    readonly canAccessMasterGardens: FieldRef<"RolePermission", 'Boolean'>
    readonly canAccessMasterFertilizers: FieldRef<"RolePermission", 'Boolean'>
    readonly canAccessMasterSuppliers: FieldRef<"RolePermission", 'Boolean'>
    readonly canAccessSupplierInformation: FieldRef<"RolePermission", 'Boolean'>
    readonly canAccessUserManagement: FieldRef<"RolePermission", 'Boolean'>
    readonly canAccessAdminDelivery: FieldRef<"RolePermission", 'Boolean'>
    readonly canAccessKraniHome: FieldRef<"RolePermission", 'Boolean'>
    readonly canAccessDeliveryWorkspace: FieldRef<"RolePermission", 'Boolean'>
    readonly createdAt: FieldRef<"RolePermission", 'DateTime'>
    readonly updatedAt: FieldRef<"RolePermission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RolePermission findUnique
   */
  export type RolePermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission findUniqueOrThrow
   */
  export type RolePermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission findFirst
   */
  export type RolePermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where?: RolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RolePermissions.
     */
    cursor?: RolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RolePermissions.
     */
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[]
  }

  /**
   * RolePermission findFirstOrThrow
   */
  export type RolePermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where?: RolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RolePermissions.
     */
    cursor?: RolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RolePermissions.
     */
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[]
  }

  /**
   * RolePermission findMany
   */
  export type RolePermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Filter, which RolePermissions to fetch.
     */
    where?: RolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RolePermissions.
     */
    cursor?: RolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RolePermissions.
     */
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[]
  }

  /**
   * RolePermission create
   */
  export type RolePermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * The data needed to create a RolePermission.
     */
    data: XOR<RolePermissionCreateInput, RolePermissionUncheckedCreateInput>
  }

  /**
   * RolePermission createMany
   */
  export type RolePermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RolePermissions.
     */
    data: RolePermissionCreateManyInput | RolePermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RolePermission createManyAndReturn
   */
  export type RolePermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * The data used to create many RolePermissions.
     */
    data: RolePermissionCreateManyInput | RolePermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RolePermission update
   */
  export type RolePermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * The data needed to update a RolePermission.
     */
    data: XOR<RolePermissionUpdateInput, RolePermissionUncheckedUpdateInput>
    /**
     * Choose, which RolePermission to update.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission updateMany
   */
  export type RolePermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RolePermissions.
     */
    data: XOR<RolePermissionUpdateManyMutationInput, RolePermissionUncheckedUpdateManyInput>
    /**
     * Filter which RolePermissions to update
     */
    where?: RolePermissionWhereInput
    /**
     * Limit how many RolePermissions to update.
     */
    limit?: number
  }

  /**
   * RolePermission updateManyAndReturn
   */
  export type RolePermissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * The data used to update RolePermissions.
     */
    data: XOR<RolePermissionUpdateManyMutationInput, RolePermissionUncheckedUpdateManyInput>
    /**
     * Filter which RolePermissions to update
     */
    where?: RolePermissionWhereInput
    /**
     * Limit how many RolePermissions to update.
     */
    limit?: number
  }

  /**
   * RolePermission upsert
   */
  export type RolePermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * The filter to search for the RolePermission to update in case it exists.
     */
    where: RolePermissionWhereUniqueInput
    /**
     * In case the RolePermission found by the `where` argument doesn't exist, create a new RolePermission with this data.
     */
    create: XOR<RolePermissionCreateInput, RolePermissionUncheckedCreateInput>
    /**
     * In case the RolePermission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RolePermissionUpdateInput, RolePermissionUncheckedUpdateInput>
  }

  /**
   * RolePermission delete
   */
  export type RolePermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Filter which RolePermission to delete.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission deleteMany
   */
  export type RolePermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RolePermissions to delete
     */
    where?: RolePermissionWhereInput
    /**
     * Limit how many RolePermissions to delete.
     */
    limit?: number
  }

  /**
   * RolePermission without action
   */
  export type RolePermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
  }


  /**
   * Model Garden
   */

  export type AggregateGarden = {
    _count: GardenCountAggregateOutputType | null
    _min: GardenMinAggregateOutputType | null
    _max: GardenMaxAggregateOutputType | null
  }

  export type GardenMinAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    address: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GardenMaxAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    address: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GardenCountAggregateOutputType = {
    id: number
    name: number
    code: number
    address: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GardenMinAggregateInputType = {
    id?: true
    name?: true
    code?: true
    address?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GardenMaxAggregateInputType = {
    id?: true
    name?: true
    code?: true
    address?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GardenCountAggregateInputType = {
    id?: true
    name?: true
    code?: true
    address?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GardenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Garden to aggregate.
     */
    where?: GardenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gardens to fetch.
     */
    orderBy?: GardenOrderByWithRelationInput | GardenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GardenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gardens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gardens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Gardens
    **/
    _count?: true | GardenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GardenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GardenMaxAggregateInputType
  }

  export type GetGardenAggregateType<T extends GardenAggregateArgs> = {
        [P in keyof T & keyof AggregateGarden]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGarden[P]>
      : GetScalarType<T[P], AggregateGarden[P]>
  }




  export type GardenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GardenWhereInput
    orderBy?: GardenOrderByWithAggregationInput | GardenOrderByWithAggregationInput[]
    by: GardenScalarFieldEnum[] | GardenScalarFieldEnum
    having?: GardenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GardenCountAggregateInputType | true
    _min?: GardenMinAggregateInputType
    _max?: GardenMaxAggregateInputType
  }

  export type GardenGroupByOutputType = {
    id: string
    name: string
    code: string
    address: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: GardenCountAggregateOutputType | null
    _min: GardenMinAggregateOutputType | null
    _max: GardenMaxAggregateOutputType | null
  }

  type GetGardenGroupByPayload<T extends GardenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GardenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GardenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GardenGroupByOutputType[P]>
            : GetScalarType<T[P], GardenGroupByOutputType[P]>
        }
      >
    >


  export type GardenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    address?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    supplyOrders?: boolean | Garden$supplyOrdersArgs<ExtArgs>
    assignedUsers?: boolean | Garden$assignedUsersArgs<ExtArgs>
    _count?: boolean | GardenCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["garden"]>

  export type GardenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    address?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["garden"]>

  export type GardenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    address?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["garden"]>

  export type GardenSelectScalar = {
    id?: boolean
    name?: boolean
    code?: boolean
    address?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GardenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "code" | "address" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["garden"]>
  export type GardenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supplyOrders?: boolean | Garden$supplyOrdersArgs<ExtArgs>
    assignedUsers?: boolean | Garden$assignedUsersArgs<ExtArgs>
    _count?: boolean | GardenCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GardenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GardenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GardenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Garden"
    objects: {
      supplyOrders: Prisma.$SupplyOrderPayload<ExtArgs>[]
      assignedUsers: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      code: string
      address: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["garden"]>
    composites: {}
  }

  type GardenGetPayload<S extends boolean | null | undefined | GardenDefaultArgs> = $Result.GetResult<Prisma.$GardenPayload, S>

  type GardenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GardenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GardenCountAggregateInputType | true
    }

  export interface GardenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Garden'], meta: { name: 'Garden' } }
    /**
     * Find zero or one Garden that matches the filter.
     * @param {GardenFindUniqueArgs} args - Arguments to find a Garden
     * @example
     * // Get one Garden
     * const garden = await prisma.garden.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GardenFindUniqueArgs>(args: SelectSubset<T, GardenFindUniqueArgs<ExtArgs>>): Prisma__GardenClient<$Result.GetResult<Prisma.$GardenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Garden that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GardenFindUniqueOrThrowArgs} args - Arguments to find a Garden
     * @example
     * // Get one Garden
     * const garden = await prisma.garden.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GardenFindUniqueOrThrowArgs>(args: SelectSubset<T, GardenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GardenClient<$Result.GetResult<Prisma.$GardenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Garden that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GardenFindFirstArgs} args - Arguments to find a Garden
     * @example
     * // Get one Garden
     * const garden = await prisma.garden.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GardenFindFirstArgs>(args?: SelectSubset<T, GardenFindFirstArgs<ExtArgs>>): Prisma__GardenClient<$Result.GetResult<Prisma.$GardenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Garden that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GardenFindFirstOrThrowArgs} args - Arguments to find a Garden
     * @example
     * // Get one Garden
     * const garden = await prisma.garden.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GardenFindFirstOrThrowArgs>(args?: SelectSubset<T, GardenFindFirstOrThrowArgs<ExtArgs>>): Prisma__GardenClient<$Result.GetResult<Prisma.$GardenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Gardens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GardenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Gardens
     * const gardens = await prisma.garden.findMany()
     * 
     * // Get first 10 Gardens
     * const gardens = await prisma.garden.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gardenWithIdOnly = await prisma.garden.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GardenFindManyArgs>(args?: SelectSubset<T, GardenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GardenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Garden.
     * @param {GardenCreateArgs} args - Arguments to create a Garden.
     * @example
     * // Create one Garden
     * const Garden = await prisma.garden.create({
     *   data: {
     *     // ... data to create a Garden
     *   }
     * })
     * 
     */
    create<T extends GardenCreateArgs>(args: SelectSubset<T, GardenCreateArgs<ExtArgs>>): Prisma__GardenClient<$Result.GetResult<Prisma.$GardenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Gardens.
     * @param {GardenCreateManyArgs} args - Arguments to create many Gardens.
     * @example
     * // Create many Gardens
     * const garden = await prisma.garden.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GardenCreateManyArgs>(args?: SelectSubset<T, GardenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Gardens and returns the data saved in the database.
     * @param {GardenCreateManyAndReturnArgs} args - Arguments to create many Gardens.
     * @example
     * // Create many Gardens
     * const garden = await prisma.garden.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Gardens and only return the `id`
     * const gardenWithIdOnly = await prisma.garden.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GardenCreateManyAndReturnArgs>(args?: SelectSubset<T, GardenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GardenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Garden.
     * @param {GardenDeleteArgs} args - Arguments to delete one Garden.
     * @example
     * // Delete one Garden
     * const Garden = await prisma.garden.delete({
     *   where: {
     *     // ... filter to delete one Garden
     *   }
     * })
     * 
     */
    delete<T extends GardenDeleteArgs>(args: SelectSubset<T, GardenDeleteArgs<ExtArgs>>): Prisma__GardenClient<$Result.GetResult<Prisma.$GardenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Garden.
     * @param {GardenUpdateArgs} args - Arguments to update one Garden.
     * @example
     * // Update one Garden
     * const garden = await prisma.garden.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GardenUpdateArgs>(args: SelectSubset<T, GardenUpdateArgs<ExtArgs>>): Prisma__GardenClient<$Result.GetResult<Prisma.$GardenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Gardens.
     * @param {GardenDeleteManyArgs} args - Arguments to filter Gardens to delete.
     * @example
     * // Delete a few Gardens
     * const { count } = await prisma.garden.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GardenDeleteManyArgs>(args?: SelectSubset<T, GardenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Gardens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GardenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Gardens
     * const garden = await prisma.garden.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GardenUpdateManyArgs>(args: SelectSubset<T, GardenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Gardens and returns the data updated in the database.
     * @param {GardenUpdateManyAndReturnArgs} args - Arguments to update many Gardens.
     * @example
     * // Update many Gardens
     * const garden = await prisma.garden.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Gardens and only return the `id`
     * const gardenWithIdOnly = await prisma.garden.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GardenUpdateManyAndReturnArgs>(args: SelectSubset<T, GardenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GardenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Garden.
     * @param {GardenUpsertArgs} args - Arguments to update or create a Garden.
     * @example
     * // Update or create a Garden
     * const garden = await prisma.garden.upsert({
     *   create: {
     *     // ... data to create a Garden
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Garden we want to update
     *   }
     * })
     */
    upsert<T extends GardenUpsertArgs>(args: SelectSubset<T, GardenUpsertArgs<ExtArgs>>): Prisma__GardenClient<$Result.GetResult<Prisma.$GardenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Gardens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GardenCountArgs} args - Arguments to filter Gardens to count.
     * @example
     * // Count the number of Gardens
     * const count = await prisma.garden.count({
     *   where: {
     *     // ... the filter for the Gardens we want to count
     *   }
     * })
    **/
    count<T extends GardenCountArgs>(
      args?: Subset<T, GardenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GardenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Garden.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GardenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GardenAggregateArgs>(args: Subset<T, GardenAggregateArgs>): Prisma.PrismaPromise<GetGardenAggregateType<T>>

    /**
     * Group by Garden.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GardenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GardenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GardenGroupByArgs['orderBy'] }
        : { orderBy?: GardenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GardenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGardenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Garden model
   */
  readonly fields: GardenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Garden.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GardenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    supplyOrders<T extends Garden$supplyOrdersArgs<ExtArgs> = {}>(args?: Subset<T, Garden$supplyOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplyOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignedUsers<T extends Garden$assignedUsersArgs<ExtArgs> = {}>(args?: Subset<T, Garden$assignedUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Garden model
   */
  interface GardenFieldRefs {
    readonly id: FieldRef<"Garden", 'String'>
    readonly name: FieldRef<"Garden", 'String'>
    readonly code: FieldRef<"Garden", 'String'>
    readonly address: FieldRef<"Garden", 'String'>
    readonly isActive: FieldRef<"Garden", 'Boolean'>
    readonly createdAt: FieldRef<"Garden", 'DateTime'>
    readonly updatedAt: FieldRef<"Garden", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Garden findUnique
   */
  export type GardenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garden
     */
    select?: GardenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Garden
     */
    omit?: GardenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GardenInclude<ExtArgs> | null
    /**
     * Filter, which Garden to fetch.
     */
    where: GardenWhereUniqueInput
  }

  /**
   * Garden findUniqueOrThrow
   */
  export type GardenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garden
     */
    select?: GardenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Garden
     */
    omit?: GardenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GardenInclude<ExtArgs> | null
    /**
     * Filter, which Garden to fetch.
     */
    where: GardenWhereUniqueInput
  }

  /**
   * Garden findFirst
   */
  export type GardenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garden
     */
    select?: GardenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Garden
     */
    omit?: GardenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GardenInclude<ExtArgs> | null
    /**
     * Filter, which Garden to fetch.
     */
    where?: GardenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gardens to fetch.
     */
    orderBy?: GardenOrderByWithRelationInput | GardenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Gardens.
     */
    cursor?: GardenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gardens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gardens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Gardens.
     */
    distinct?: GardenScalarFieldEnum | GardenScalarFieldEnum[]
  }

  /**
   * Garden findFirstOrThrow
   */
  export type GardenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garden
     */
    select?: GardenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Garden
     */
    omit?: GardenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GardenInclude<ExtArgs> | null
    /**
     * Filter, which Garden to fetch.
     */
    where?: GardenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gardens to fetch.
     */
    orderBy?: GardenOrderByWithRelationInput | GardenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Gardens.
     */
    cursor?: GardenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gardens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gardens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Gardens.
     */
    distinct?: GardenScalarFieldEnum | GardenScalarFieldEnum[]
  }

  /**
   * Garden findMany
   */
  export type GardenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garden
     */
    select?: GardenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Garden
     */
    omit?: GardenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GardenInclude<ExtArgs> | null
    /**
     * Filter, which Gardens to fetch.
     */
    where?: GardenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gardens to fetch.
     */
    orderBy?: GardenOrderByWithRelationInput | GardenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Gardens.
     */
    cursor?: GardenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gardens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gardens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Gardens.
     */
    distinct?: GardenScalarFieldEnum | GardenScalarFieldEnum[]
  }

  /**
   * Garden create
   */
  export type GardenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garden
     */
    select?: GardenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Garden
     */
    omit?: GardenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GardenInclude<ExtArgs> | null
    /**
     * The data needed to create a Garden.
     */
    data: XOR<GardenCreateInput, GardenUncheckedCreateInput>
  }

  /**
   * Garden createMany
   */
  export type GardenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Gardens.
     */
    data: GardenCreateManyInput | GardenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Garden createManyAndReturn
   */
  export type GardenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garden
     */
    select?: GardenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Garden
     */
    omit?: GardenOmit<ExtArgs> | null
    /**
     * The data used to create many Gardens.
     */
    data: GardenCreateManyInput | GardenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Garden update
   */
  export type GardenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garden
     */
    select?: GardenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Garden
     */
    omit?: GardenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GardenInclude<ExtArgs> | null
    /**
     * The data needed to update a Garden.
     */
    data: XOR<GardenUpdateInput, GardenUncheckedUpdateInput>
    /**
     * Choose, which Garden to update.
     */
    where: GardenWhereUniqueInput
  }

  /**
   * Garden updateMany
   */
  export type GardenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Gardens.
     */
    data: XOR<GardenUpdateManyMutationInput, GardenUncheckedUpdateManyInput>
    /**
     * Filter which Gardens to update
     */
    where?: GardenWhereInput
    /**
     * Limit how many Gardens to update.
     */
    limit?: number
  }

  /**
   * Garden updateManyAndReturn
   */
  export type GardenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garden
     */
    select?: GardenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Garden
     */
    omit?: GardenOmit<ExtArgs> | null
    /**
     * The data used to update Gardens.
     */
    data: XOR<GardenUpdateManyMutationInput, GardenUncheckedUpdateManyInput>
    /**
     * Filter which Gardens to update
     */
    where?: GardenWhereInput
    /**
     * Limit how many Gardens to update.
     */
    limit?: number
  }

  /**
   * Garden upsert
   */
  export type GardenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garden
     */
    select?: GardenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Garden
     */
    omit?: GardenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GardenInclude<ExtArgs> | null
    /**
     * The filter to search for the Garden to update in case it exists.
     */
    where: GardenWhereUniqueInput
    /**
     * In case the Garden found by the `where` argument doesn't exist, create a new Garden with this data.
     */
    create: XOR<GardenCreateInput, GardenUncheckedCreateInput>
    /**
     * In case the Garden was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GardenUpdateInput, GardenUncheckedUpdateInput>
  }

  /**
   * Garden delete
   */
  export type GardenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garden
     */
    select?: GardenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Garden
     */
    omit?: GardenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GardenInclude<ExtArgs> | null
    /**
     * Filter which Garden to delete.
     */
    where: GardenWhereUniqueInput
  }

  /**
   * Garden deleteMany
   */
  export type GardenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Gardens to delete
     */
    where?: GardenWhereInput
    /**
     * Limit how many Gardens to delete.
     */
    limit?: number
  }

  /**
   * Garden.supplyOrders
   */
  export type Garden$supplyOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplyOrder
     */
    select?: SupplyOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplyOrder
     */
    omit?: SupplyOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyOrderInclude<ExtArgs> | null
    where?: SupplyOrderWhereInput
    orderBy?: SupplyOrderOrderByWithRelationInput | SupplyOrderOrderByWithRelationInput[]
    cursor?: SupplyOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SupplyOrderScalarFieldEnum | SupplyOrderScalarFieldEnum[]
  }

  /**
   * Garden.assignedUsers
   */
  export type Garden$assignedUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Garden without action
   */
  export type GardenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garden
     */
    select?: GardenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Garden
     */
    omit?: GardenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GardenInclude<ExtArgs> | null
  }


  /**
   * Model FertilizerType
   */

  export type AggregateFertilizerType = {
    _count: FertilizerTypeCountAggregateOutputType | null
    _min: FertilizerTypeMinAggregateOutputType | null
    _max: FertilizerTypeMaxAggregateOutputType | null
  }

  export type FertilizerTypeMinAggregateOutputType = {
    id: string | null
    name: string | null
    unit: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FertilizerTypeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    unit: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FertilizerTypeCountAggregateOutputType = {
    id: number
    name: number
    unit: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FertilizerTypeMinAggregateInputType = {
    id?: true
    name?: true
    unit?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FertilizerTypeMaxAggregateInputType = {
    id?: true
    name?: true
    unit?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FertilizerTypeCountAggregateInputType = {
    id?: true
    name?: true
    unit?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FertilizerTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FertilizerType to aggregate.
     */
    where?: FertilizerTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FertilizerTypes to fetch.
     */
    orderBy?: FertilizerTypeOrderByWithRelationInput | FertilizerTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FertilizerTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FertilizerTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FertilizerTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FertilizerTypes
    **/
    _count?: true | FertilizerTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FertilizerTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FertilizerTypeMaxAggregateInputType
  }

  export type GetFertilizerTypeAggregateType<T extends FertilizerTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateFertilizerType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFertilizerType[P]>
      : GetScalarType<T[P], AggregateFertilizerType[P]>
  }




  export type FertilizerTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FertilizerTypeWhereInput
    orderBy?: FertilizerTypeOrderByWithAggregationInput | FertilizerTypeOrderByWithAggregationInput[]
    by: FertilizerTypeScalarFieldEnum[] | FertilizerTypeScalarFieldEnum
    having?: FertilizerTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FertilizerTypeCountAggregateInputType | true
    _min?: FertilizerTypeMinAggregateInputType
    _max?: FertilizerTypeMaxAggregateInputType
  }

  export type FertilizerTypeGroupByOutputType = {
    id: string
    name: string
    unit: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: FertilizerTypeCountAggregateOutputType | null
    _min: FertilizerTypeMinAggregateOutputType | null
    _max: FertilizerTypeMaxAggregateOutputType | null
  }

  type GetFertilizerTypeGroupByPayload<T extends FertilizerTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FertilizerTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FertilizerTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FertilizerTypeGroupByOutputType[P]>
            : GetScalarType<T[P], FertilizerTypeGroupByOutputType[P]>
        }
      >
    >


  export type FertilizerTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    unit?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    supplyOrders?: boolean | FertilizerType$supplyOrdersArgs<ExtArgs>
    _count?: boolean | FertilizerTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fertilizerType"]>

  export type FertilizerTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    unit?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["fertilizerType"]>

  export type FertilizerTypeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    unit?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["fertilizerType"]>

  export type FertilizerTypeSelectScalar = {
    id?: boolean
    name?: boolean
    unit?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FertilizerTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "unit" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["fertilizerType"]>
  export type FertilizerTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supplyOrders?: boolean | FertilizerType$supplyOrdersArgs<ExtArgs>
    _count?: boolean | FertilizerTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FertilizerTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FertilizerTypeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FertilizerTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FertilizerType"
    objects: {
      supplyOrders: Prisma.$SupplyOrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      unit: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["fertilizerType"]>
    composites: {}
  }

  type FertilizerTypeGetPayload<S extends boolean | null | undefined | FertilizerTypeDefaultArgs> = $Result.GetResult<Prisma.$FertilizerTypePayload, S>

  type FertilizerTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FertilizerTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FertilizerTypeCountAggregateInputType | true
    }

  export interface FertilizerTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FertilizerType'], meta: { name: 'FertilizerType' } }
    /**
     * Find zero or one FertilizerType that matches the filter.
     * @param {FertilizerTypeFindUniqueArgs} args - Arguments to find a FertilizerType
     * @example
     * // Get one FertilizerType
     * const fertilizerType = await prisma.fertilizerType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FertilizerTypeFindUniqueArgs>(args: SelectSubset<T, FertilizerTypeFindUniqueArgs<ExtArgs>>): Prisma__FertilizerTypeClient<$Result.GetResult<Prisma.$FertilizerTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FertilizerType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FertilizerTypeFindUniqueOrThrowArgs} args - Arguments to find a FertilizerType
     * @example
     * // Get one FertilizerType
     * const fertilizerType = await prisma.fertilizerType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FertilizerTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, FertilizerTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FertilizerTypeClient<$Result.GetResult<Prisma.$FertilizerTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FertilizerType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FertilizerTypeFindFirstArgs} args - Arguments to find a FertilizerType
     * @example
     * // Get one FertilizerType
     * const fertilizerType = await prisma.fertilizerType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FertilizerTypeFindFirstArgs>(args?: SelectSubset<T, FertilizerTypeFindFirstArgs<ExtArgs>>): Prisma__FertilizerTypeClient<$Result.GetResult<Prisma.$FertilizerTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FertilizerType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FertilizerTypeFindFirstOrThrowArgs} args - Arguments to find a FertilizerType
     * @example
     * // Get one FertilizerType
     * const fertilizerType = await prisma.fertilizerType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FertilizerTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, FertilizerTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__FertilizerTypeClient<$Result.GetResult<Prisma.$FertilizerTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FertilizerTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FertilizerTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FertilizerTypes
     * const fertilizerTypes = await prisma.fertilizerType.findMany()
     * 
     * // Get first 10 FertilizerTypes
     * const fertilizerTypes = await prisma.fertilizerType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fertilizerTypeWithIdOnly = await prisma.fertilizerType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FertilizerTypeFindManyArgs>(args?: SelectSubset<T, FertilizerTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FertilizerTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FertilizerType.
     * @param {FertilizerTypeCreateArgs} args - Arguments to create a FertilizerType.
     * @example
     * // Create one FertilizerType
     * const FertilizerType = await prisma.fertilizerType.create({
     *   data: {
     *     // ... data to create a FertilizerType
     *   }
     * })
     * 
     */
    create<T extends FertilizerTypeCreateArgs>(args: SelectSubset<T, FertilizerTypeCreateArgs<ExtArgs>>): Prisma__FertilizerTypeClient<$Result.GetResult<Prisma.$FertilizerTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FertilizerTypes.
     * @param {FertilizerTypeCreateManyArgs} args - Arguments to create many FertilizerTypes.
     * @example
     * // Create many FertilizerTypes
     * const fertilizerType = await prisma.fertilizerType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FertilizerTypeCreateManyArgs>(args?: SelectSubset<T, FertilizerTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FertilizerTypes and returns the data saved in the database.
     * @param {FertilizerTypeCreateManyAndReturnArgs} args - Arguments to create many FertilizerTypes.
     * @example
     * // Create many FertilizerTypes
     * const fertilizerType = await prisma.fertilizerType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FertilizerTypes and only return the `id`
     * const fertilizerTypeWithIdOnly = await prisma.fertilizerType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FertilizerTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, FertilizerTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FertilizerTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FertilizerType.
     * @param {FertilizerTypeDeleteArgs} args - Arguments to delete one FertilizerType.
     * @example
     * // Delete one FertilizerType
     * const FertilizerType = await prisma.fertilizerType.delete({
     *   where: {
     *     // ... filter to delete one FertilizerType
     *   }
     * })
     * 
     */
    delete<T extends FertilizerTypeDeleteArgs>(args: SelectSubset<T, FertilizerTypeDeleteArgs<ExtArgs>>): Prisma__FertilizerTypeClient<$Result.GetResult<Prisma.$FertilizerTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FertilizerType.
     * @param {FertilizerTypeUpdateArgs} args - Arguments to update one FertilizerType.
     * @example
     * // Update one FertilizerType
     * const fertilizerType = await prisma.fertilizerType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FertilizerTypeUpdateArgs>(args: SelectSubset<T, FertilizerTypeUpdateArgs<ExtArgs>>): Prisma__FertilizerTypeClient<$Result.GetResult<Prisma.$FertilizerTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FertilizerTypes.
     * @param {FertilizerTypeDeleteManyArgs} args - Arguments to filter FertilizerTypes to delete.
     * @example
     * // Delete a few FertilizerTypes
     * const { count } = await prisma.fertilizerType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FertilizerTypeDeleteManyArgs>(args?: SelectSubset<T, FertilizerTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FertilizerTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FertilizerTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FertilizerTypes
     * const fertilizerType = await prisma.fertilizerType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FertilizerTypeUpdateManyArgs>(args: SelectSubset<T, FertilizerTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FertilizerTypes and returns the data updated in the database.
     * @param {FertilizerTypeUpdateManyAndReturnArgs} args - Arguments to update many FertilizerTypes.
     * @example
     * // Update many FertilizerTypes
     * const fertilizerType = await prisma.fertilizerType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FertilizerTypes and only return the `id`
     * const fertilizerTypeWithIdOnly = await prisma.fertilizerType.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FertilizerTypeUpdateManyAndReturnArgs>(args: SelectSubset<T, FertilizerTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FertilizerTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FertilizerType.
     * @param {FertilizerTypeUpsertArgs} args - Arguments to update or create a FertilizerType.
     * @example
     * // Update or create a FertilizerType
     * const fertilizerType = await prisma.fertilizerType.upsert({
     *   create: {
     *     // ... data to create a FertilizerType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FertilizerType we want to update
     *   }
     * })
     */
    upsert<T extends FertilizerTypeUpsertArgs>(args: SelectSubset<T, FertilizerTypeUpsertArgs<ExtArgs>>): Prisma__FertilizerTypeClient<$Result.GetResult<Prisma.$FertilizerTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FertilizerTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FertilizerTypeCountArgs} args - Arguments to filter FertilizerTypes to count.
     * @example
     * // Count the number of FertilizerTypes
     * const count = await prisma.fertilizerType.count({
     *   where: {
     *     // ... the filter for the FertilizerTypes we want to count
     *   }
     * })
    **/
    count<T extends FertilizerTypeCountArgs>(
      args?: Subset<T, FertilizerTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FertilizerTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FertilizerType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FertilizerTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FertilizerTypeAggregateArgs>(args: Subset<T, FertilizerTypeAggregateArgs>): Prisma.PrismaPromise<GetFertilizerTypeAggregateType<T>>

    /**
     * Group by FertilizerType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FertilizerTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FertilizerTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FertilizerTypeGroupByArgs['orderBy'] }
        : { orderBy?: FertilizerTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FertilizerTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFertilizerTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FertilizerType model
   */
  readonly fields: FertilizerTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FertilizerType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FertilizerTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    supplyOrders<T extends FertilizerType$supplyOrdersArgs<ExtArgs> = {}>(args?: Subset<T, FertilizerType$supplyOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplyOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FertilizerType model
   */
  interface FertilizerTypeFieldRefs {
    readonly id: FieldRef<"FertilizerType", 'String'>
    readonly name: FieldRef<"FertilizerType", 'String'>
    readonly unit: FieldRef<"FertilizerType", 'String'>
    readonly isActive: FieldRef<"FertilizerType", 'Boolean'>
    readonly createdAt: FieldRef<"FertilizerType", 'DateTime'>
    readonly updatedAt: FieldRef<"FertilizerType", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FertilizerType findUnique
   */
  export type FertilizerTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FertilizerType
     */
    select?: FertilizerTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FertilizerType
     */
    omit?: FertilizerTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FertilizerTypeInclude<ExtArgs> | null
    /**
     * Filter, which FertilizerType to fetch.
     */
    where: FertilizerTypeWhereUniqueInput
  }

  /**
   * FertilizerType findUniqueOrThrow
   */
  export type FertilizerTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FertilizerType
     */
    select?: FertilizerTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FertilizerType
     */
    omit?: FertilizerTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FertilizerTypeInclude<ExtArgs> | null
    /**
     * Filter, which FertilizerType to fetch.
     */
    where: FertilizerTypeWhereUniqueInput
  }

  /**
   * FertilizerType findFirst
   */
  export type FertilizerTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FertilizerType
     */
    select?: FertilizerTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FertilizerType
     */
    omit?: FertilizerTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FertilizerTypeInclude<ExtArgs> | null
    /**
     * Filter, which FertilizerType to fetch.
     */
    where?: FertilizerTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FertilizerTypes to fetch.
     */
    orderBy?: FertilizerTypeOrderByWithRelationInput | FertilizerTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FertilizerTypes.
     */
    cursor?: FertilizerTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FertilizerTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FertilizerTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FertilizerTypes.
     */
    distinct?: FertilizerTypeScalarFieldEnum | FertilizerTypeScalarFieldEnum[]
  }

  /**
   * FertilizerType findFirstOrThrow
   */
  export type FertilizerTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FertilizerType
     */
    select?: FertilizerTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FertilizerType
     */
    omit?: FertilizerTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FertilizerTypeInclude<ExtArgs> | null
    /**
     * Filter, which FertilizerType to fetch.
     */
    where?: FertilizerTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FertilizerTypes to fetch.
     */
    orderBy?: FertilizerTypeOrderByWithRelationInput | FertilizerTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FertilizerTypes.
     */
    cursor?: FertilizerTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FertilizerTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FertilizerTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FertilizerTypes.
     */
    distinct?: FertilizerTypeScalarFieldEnum | FertilizerTypeScalarFieldEnum[]
  }

  /**
   * FertilizerType findMany
   */
  export type FertilizerTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FertilizerType
     */
    select?: FertilizerTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FertilizerType
     */
    omit?: FertilizerTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FertilizerTypeInclude<ExtArgs> | null
    /**
     * Filter, which FertilizerTypes to fetch.
     */
    where?: FertilizerTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FertilizerTypes to fetch.
     */
    orderBy?: FertilizerTypeOrderByWithRelationInput | FertilizerTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FertilizerTypes.
     */
    cursor?: FertilizerTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FertilizerTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FertilizerTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FertilizerTypes.
     */
    distinct?: FertilizerTypeScalarFieldEnum | FertilizerTypeScalarFieldEnum[]
  }

  /**
   * FertilizerType create
   */
  export type FertilizerTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FertilizerType
     */
    select?: FertilizerTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FertilizerType
     */
    omit?: FertilizerTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FertilizerTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a FertilizerType.
     */
    data: XOR<FertilizerTypeCreateInput, FertilizerTypeUncheckedCreateInput>
  }

  /**
   * FertilizerType createMany
   */
  export type FertilizerTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FertilizerTypes.
     */
    data: FertilizerTypeCreateManyInput | FertilizerTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FertilizerType createManyAndReturn
   */
  export type FertilizerTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FertilizerType
     */
    select?: FertilizerTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FertilizerType
     */
    omit?: FertilizerTypeOmit<ExtArgs> | null
    /**
     * The data used to create many FertilizerTypes.
     */
    data: FertilizerTypeCreateManyInput | FertilizerTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FertilizerType update
   */
  export type FertilizerTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FertilizerType
     */
    select?: FertilizerTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FertilizerType
     */
    omit?: FertilizerTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FertilizerTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a FertilizerType.
     */
    data: XOR<FertilizerTypeUpdateInput, FertilizerTypeUncheckedUpdateInput>
    /**
     * Choose, which FertilizerType to update.
     */
    where: FertilizerTypeWhereUniqueInput
  }

  /**
   * FertilizerType updateMany
   */
  export type FertilizerTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FertilizerTypes.
     */
    data: XOR<FertilizerTypeUpdateManyMutationInput, FertilizerTypeUncheckedUpdateManyInput>
    /**
     * Filter which FertilizerTypes to update
     */
    where?: FertilizerTypeWhereInput
    /**
     * Limit how many FertilizerTypes to update.
     */
    limit?: number
  }

  /**
   * FertilizerType updateManyAndReturn
   */
  export type FertilizerTypeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FertilizerType
     */
    select?: FertilizerTypeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FertilizerType
     */
    omit?: FertilizerTypeOmit<ExtArgs> | null
    /**
     * The data used to update FertilizerTypes.
     */
    data: XOR<FertilizerTypeUpdateManyMutationInput, FertilizerTypeUncheckedUpdateManyInput>
    /**
     * Filter which FertilizerTypes to update
     */
    where?: FertilizerTypeWhereInput
    /**
     * Limit how many FertilizerTypes to update.
     */
    limit?: number
  }

  /**
   * FertilizerType upsert
   */
  export type FertilizerTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FertilizerType
     */
    select?: FertilizerTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FertilizerType
     */
    omit?: FertilizerTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FertilizerTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the FertilizerType to update in case it exists.
     */
    where: FertilizerTypeWhereUniqueInput
    /**
     * In case the FertilizerType found by the `where` argument doesn't exist, create a new FertilizerType with this data.
     */
    create: XOR<FertilizerTypeCreateInput, FertilizerTypeUncheckedCreateInput>
    /**
     * In case the FertilizerType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FertilizerTypeUpdateInput, FertilizerTypeUncheckedUpdateInput>
  }

  /**
   * FertilizerType delete
   */
  export type FertilizerTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FertilizerType
     */
    select?: FertilizerTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FertilizerType
     */
    omit?: FertilizerTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FertilizerTypeInclude<ExtArgs> | null
    /**
     * Filter which FertilizerType to delete.
     */
    where: FertilizerTypeWhereUniqueInput
  }

  /**
   * FertilizerType deleteMany
   */
  export type FertilizerTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FertilizerTypes to delete
     */
    where?: FertilizerTypeWhereInput
    /**
     * Limit how many FertilizerTypes to delete.
     */
    limit?: number
  }

  /**
   * FertilizerType.supplyOrders
   */
  export type FertilizerType$supplyOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplyOrder
     */
    select?: SupplyOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplyOrder
     */
    omit?: SupplyOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyOrderInclude<ExtArgs> | null
    where?: SupplyOrderWhereInput
    orderBy?: SupplyOrderOrderByWithRelationInput | SupplyOrderOrderByWithRelationInput[]
    cursor?: SupplyOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SupplyOrderScalarFieldEnum | SupplyOrderScalarFieldEnum[]
  }

  /**
   * FertilizerType without action
   */
  export type FertilizerTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FertilizerType
     */
    select?: FertilizerTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FertilizerType
     */
    omit?: FertilizerTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FertilizerTypeInclude<ExtArgs> | null
  }


  /**
   * Model Supplier
   */

  export type AggregateSupplier = {
    _count: SupplierCountAggregateOutputType | null
    _min: SupplierMinAggregateOutputType | null
    _max: SupplierMaxAggregateOutputType | null
  }

  export type SupplierMinAggregateOutputType = {
    id: string | null
    name: string | null
    contactName: string | null
    address: string | null
    phone: string | null
    email: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupplierMaxAggregateOutputType = {
    id: string | null
    name: string | null
    contactName: string | null
    address: string | null
    phone: string | null
    email: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupplierCountAggregateOutputType = {
    id: number
    name: number
    contactName: number
    address: number
    phone: number
    email: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SupplierMinAggregateInputType = {
    id?: true
    name?: true
    contactName?: true
    address?: true
    phone?: true
    email?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupplierMaxAggregateInputType = {
    id?: true
    name?: true
    contactName?: true
    address?: true
    phone?: true
    email?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupplierCountAggregateInputType = {
    id?: true
    name?: true
    contactName?: true
    address?: true
    phone?: true
    email?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SupplierAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Supplier to aggregate.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Suppliers
    **/
    _count?: true | SupplierCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupplierMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupplierMaxAggregateInputType
  }

  export type GetSupplierAggregateType<T extends SupplierAggregateArgs> = {
        [P in keyof T & keyof AggregateSupplier]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupplier[P]>
      : GetScalarType<T[P], AggregateSupplier[P]>
  }




  export type SupplierGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupplierWhereInput
    orderBy?: SupplierOrderByWithAggregationInput | SupplierOrderByWithAggregationInput[]
    by: SupplierScalarFieldEnum[] | SupplierScalarFieldEnum
    having?: SupplierScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupplierCountAggregateInputType | true
    _min?: SupplierMinAggregateInputType
    _max?: SupplierMaxAggregateInputType
  }

  export type SupplierGroupByOutputType = {
    id: string
    name: string
    contactName: string | null
    address: string | null
    phone: string | null
    email: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: SupplierCountAggregateOutputType | null
    _min: SupplierMinAggregateOutputType | null
    _max: SupplierMaxAggregateOutputType | null
  }

  type GetSupplierGroupByPayload<T extends SupplierGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupplierGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupplierGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupplierGroupByOutputType[P]>
            : GetScalarType<T[P], SupplierGroupByOutputType[P]>
        }
      >
    >


  export type SupplierSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    contactName?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    supplyOrders?: boolean | Supplier$supplyOrdersArgs<ExtArgs>
    _count?: boolean | SupplierCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supplier"]>

  export type SupplierSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    contactName?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["supplier"]>

  export type SupplierSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    contactName?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["supplier"]>

  export type SupplierSelectScalar = {
    id?: boolean
    name?: boolean
    contactName?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SupplierOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "contactName" | "address" | "phone" | "email" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["supplier"]>
  export type SupplierInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supplyOrders?: boolean | Supplier$supplyOrdersArgs<ExtArgs>
    _count?: boolean | SupplierCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SupplierIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SupplierIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SupplierPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Supplier"
    objects: {
      supplyOrders: Prisma.$SupplyOrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      contactName: string | null
      address: string | null
      phone: string | null
      email: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["supplier"]>
    composites: {}
  }

  type SupplierGetPayload<S extends boolean | null | undefined | SupplierDefaultArgs> = $Result.GetResult<Prisma.$SupplierPayload, S>

  type SupplierCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SupplierFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SupplierCountAggregateInputType | true
    }

  export interface SupplierDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Supplier'], meta: { name: 'Supplier' } }
    /**
     * Find zero or one Supplier that matches the filter.
     * @param {SupplierFindUniqueArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupplierFindUniqueArgs>(args: SelectSubset<T, SupplierFindUniqueArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Supplier that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SupplierFindUniqueOrThrowArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupplierFindUniqueOrThrowArgs>(args: SelectSubset<T, SupplierFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Supplier that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindFirstArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupplierFindFirstArgs>(args?: SelectSubset<T, SupplierFindFirstArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Supplier that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindFirstOrThrowArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupplierFindFirstOrThrowArgs>(args?: SelectSubset<T, SupplierFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Suppliers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Suppliers
     * const suppliers = await prisma.supplier.findMany()
     * 
     * // Get first 10 Suppliers
     * const suppliers = await prisma.supplier.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supplierWithIdOnly = await prisma.supplier.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupplierFindManyArgs>(args?: SelectSubset<T, SupplierFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Supplier.
     * @param {SupplierCreateArgs} args - Arguments to create a Supplier.
     * @example
     * // Create one Supplier
     * const Supplier = await prisma.supplier.create({
     *   data: {
     *     // ... data to create a Supplier
     *   }
     * })
     * 
     */
    create<T extends SupplierCreateArgs>(args: SelectSubset<T, SupplierCreateArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Suppliers.
     * @param {SupplierCreateManyArgs} args - Arguments to create many Suppliers.
     * @example
     * // Create many Suppliers
     * const supplier = await prisma.supplier.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupplierCreateManyArgs>(args?: SelectSubset<T, SupplierCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Suppliers and returns the data saved in the database.
     * @param {SupplierCreateManyAndReturnArgs} args - Arguments to create many Suppliers.
     * @example
     * // Create many Suppliers
     * const supplier = await prisma.supplier.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Suppliers and only return the `id`
     * const supplierWithIdOnly = await prisma.supplier.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SupplierCreateManyAndReturnArgs>(args?: SelectSubset<T, SupplierCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Supplier.
     * @param {SupplierDeleteArgs} args - Arguments to delete one Supplier.
     * @example
     * // Delete one Supplier
     * const Supplier = await prisma.supplier.delete({
     *   where: {
     *     // ... filter to delete one Supplier
     *   }
     * })
     * 
     */
    delete<T extends SupplierDeleteArgs>(args: SelectSubset<T, SupplierDeleteArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Supplier.
     * @param {SupplierUpdateArgs} args - Arguments to update one Supplier.
     * @example
     * // Update one Supplier
     * const supplier = await prisma.supplier.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupplierUpdateArgs>(args: SelectSubset<T, SupplierUpdateArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Suppliers.
     * @param {SupplierDeleteManyArgs} args - Arguments to filter Suppliers to delete.
     * @example
     * // Delete a few Suppliers
     * const { count } = await prisma.supplier.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupplierDeleteManyArgs>(args?: SelectSubset<T, SupplierDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Suppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Suppliers
     * const supplier = await prisma.supplier.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupplierUpdateManyArgs>(args: SelectSubset<T, SupplierUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Suppliers and returns the data updated in the database.
     * @param {SupplierUpdateManyAndReturnArgs} args - Arguments to update many Suppliers.
     * @example
     * // Update many Suppliers
     * const supplier = await prisma.supplier.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Suppliers and only return the `id`
     * const supplierWithIdOnly = await prisma.supplier.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SupplierUpdateManyAndReturnArgs>(args: SelectSubset<T, SupplierUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Supplier.
     * @param {SupplierUpsertArgs} args - Arguments to update or create a Supplier.
     * @example
     * // Update or create a Supplier
     * const supplier = await prisma.supplier.upsert({
     *   create: {
     *     // ... data to create a Supplier
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Supplier we want to update
     *   }
     * })
     */
    upsert<T extends SupplierUpsertArgs>(args: SelectSubset<T, SupplierUpsertArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Suppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierCountArgs} args - Arguments to filter Suppliers to count.
     * @example
     * // Count the number of Suppliers
     * const count = await prisma.supplier.count({
     *   where: {
     *     // ... the filter for the Suppliers we want to count
     *   }
     * })
    **/
    count<T extends SupplierCountArgs>(
      args?: Subset<T, SupplierCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupplierCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Supplier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SupplierAggregateArgs>(args: Subset<T, SupplierAggregateArgs>): Prisma.PrismaPromise<GetSupplierAggregateType<T>>

    /**
     * Group by Supplier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SupplierGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupplierGroupByArgs['orderBy'] }
        : { orderBy?: SupplierGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SupplierGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupplierGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Supplier model
   */
  readonly fields: SupplierFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Supplier.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupplierClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    supplyOrders<T extends Supplier$supplyOrdersArgs<ExtArgs> = {}>(args?: Subset<T, Supplier$supplyOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplyOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Supplier model
   */
  interface SupplierFieldRefs {
    readonly id: FieldRef<"Supplier", 'String'>
    readonly name: FieldRef<"Supplier", 'String'>
    readonly contactName: FieldRef<"Supplier", 'String'>
    readonly address: FieldRef<"Supplier", 'String'>
    readonly phone: FieldRef<"Supplier", 'String'>
    readonly email: FieldRef<"Supplier", 'String'>
    readonly isActive: FieldRef<"Supplier", 'Boolean'>
    readonly createdAt: FieldRef<"Supplier", 'DateTime'>
    readonly updatedAt: FieldRef<"Supplier", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Supplier findUnique
   */
  export type SupplierFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier findUniqueOrThrow
   */
  export type SupplierFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier findFirst
   */
  export type SupplierFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suppliers.
     */
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier findFirstOrThrow
   */
  export type SupplierFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suppliers.
     */
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier findMany
   */
  export type SupplierFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Suppliers to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suppliers.
     */
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier create
   */
  export type SupplierCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The data needed to create a Supplier.
     */
    data: XOR<SupplierCreateInput, SupplierUncheckedCreateInput>
  }

  /**
   * Supplier createMany
   */
  export type SupplierCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Suppliers.
     */
    data: SupplierCreateManyInput | SupplierCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Supplier createManyAndReturn
   */
  export type SupplierCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * The data used to create many Suppliers.
     */
    data: SupplierCreateManyInput | SupplierCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Supplier update
   */
  export type SupplierUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The data needed to update a Supplier.
     */
    data: XOR<SupplierUpdateInput, SupplierUncheckedUpdateInput>
    /**
     * Choose, which Supplier to update.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier updateMany
   */
  export type SupplierUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Suppliers.
     */
    data: XOR<SupplierUpdateManyMutationInput, SupplierUncheckedUpdateManyInput>
    /**
     * Filter which Suppliers to update
     */
    where?: SupplierWhereInput
    /**
     * Limit how many Suppliers to update.
     */
    limit?: number
  }

  /**
   * Supplier updateManyAndReturn
   */
  export type SupplierUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * The data used to update Suppliers.
     */
    data: XOR<SupplierUpdateManyMutationInput, SupplierUncheckedUpdateManyInput>
    /**
     * Filter which Suppliers to update
     */
    where?: SupplierWhereInput
    /**
     * Limit how many Suppliers to update.
     */
    limit?: number
  }

  /**
   * Supplier upsert
   */
  export type SupplierUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The filter to search for the Supplier to update in case it exists.
     */
    where: SupplierWhereUniqueInput
    /**
     * In case the Supplier found by the `where` argument doesn't exist, create a new Supplier with this data.
     */
    create: XOR<SupplierCreateInput, SupplierUncheckedCreateInput>
    /**
     * In case the Supplier was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupplierUpdateInput, SupplierUncheckedUpdateInput>
  }

  /**
   * Supplier delete
   */
  export type SupplierDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter which Supplier to delete.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier deleteMany
   */
  export type SupplierDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Suppliers to delete
     */
    where?: SupplierWhereInput
    /**
     * Limit how many Suppliers to delete.
     */
    limit?: number
  }

  /**
   * Supplier.supplyOrders
   */
  export type Supplier$supplyOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplyOrder
     */
    select?: SupplyOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplyOrder
     */
    omit?: SupplyOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyOrderInclude<ExtArgs> | null
    where?: SupplyOrderWhereInput
    orderBy?: SupplyOrderOrderByWithRelationInput | SupplyOrderOrderByWithRelationInput[]
    cursor?: SupplyOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SupplyOrderScalarFieldEnum | SupplyOrderScalarFieldEnum[]
  }

  /**
   * Supplier without action
   */
  export type SupplierDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
  }


  /**
   * Model SupplyOrder
   */

  export type AggregateSupplyOrder = {
    _count: SupplyOrderCountAggregateOutputType | null
    _avg: SupplyOrderAvgAggregateOutputType | null
    _sum: SupplyOrderSumAggregateOutputType | null
    _min: SupplyOrderMinAggregateOutputType | null
    _max: SupplyOrderMaxAggregateOutputType | null
  }

  export type SupplyOrderAvgAggregateOutputType = {
    quantityOrdered: number | null
    unitPrice: Decimal | null
    freightCost: Decimal | null
    totalCost: Decimal | null
    ppnAmount: Decimal | null
    grandTotal: Decimal | null
  }

  export type SupplyOrderSumAggregateOutputType = {
    quantityOrdered: number | null
    unitPrice: Decimal | null
    freightCost: Decimal | null
    totalCost: Decimal | null
    ppnAmount: Decimal | null
    grandTotal: Decimal | null
  }

  export type SupplyOrderMinAggregateOutputType = {
    id: string | null
    gardenId: string | null
    fertilizerTypeId: string | null
    supplierId: string | null
    sp2bjNumber: string | null
    contractStartDate: Date | null
    contractEndDate: Date | null
    quantityOrdered: number | null
    budgetType: $Enums.SupplyBudgetType | null
    unitPrice: Decimal | null
    freightCost: Decimal | null
    totalCost: Decimal | null
    ppnAmount: Decimal | null
    grandTotal: Decimal | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupplyOrderMaxAggregateOutputType = {
    id: string | null
    gardenId: string | null
    fertilizerTypeId: string | null
    supplierId: string | null
    sp2bjNumber: string | null
    contractStartDate: Date | null
    contractEndDate: Date | null
    quantityOrdered: number | null
    budgetType: $Enums.SupplyBudgetType | null
    unitPrice: Decimal | null
    freightCost: Decimal | null
    totalCost: Decimal | null
    ppnAmount: Decimal | null
    grandTotal: Decimal | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupplyOrderCountAggregateOutputType = {
    id: number
    gardenId: number
    fertilizerTypeId: number
    supplierId: number
    sp2bjNumber: number
    contractStartDate: number
    contractEndDate: number
    quantityOrdered: number
    budgetType: number
    unitPrice: number
    freightCost: number
    totalCost: number
    ppnAmount: number
    grandTotal: number
    createdById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SupplyOrderAvgAggregateInputType = {
    quantityOrdered?: true
    unitPrice?: true
    freightCost?: true
    totalCost?: true
    ppnAmount?: true
    grandTotal?: true
  }

  export type SupplyOrderSumAggregateInputType = {
    quantityOrdered?: true
    unitPrice?: true
    freightCost?: true
    totalCost?: true
    ppnAmount?: true
    grandTotal?: true
  }

  export type SupplyOrderMinAggregateInputType = {
    id?: true
    gardenId?: true
    fertilizerTypeId?: true
    supplierId?: true
    sp2bjNumber?: true
    contractStartDate?: true
    contractEndDate?: true
    quantityOrdered?: true
    budgetType?: true
    unitPrice?: true
    freightCost?: true
    totalCost?: true
    ppnAmount?: true
    grandTotal?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupplyOrderMaxAggregateInputType = {
    id?: true
    gardenId?: true
    fertilizerTypeId?: true
    supplierId?: true
    sp2bjNumber?: true
    contractStartDate?: true
    contractEndDate?: true
    quantityOrdered?: true
    budgetType?: true
    unitPrice?: true
    freightCost?: true
    totalCost?: true
    ppnAmount?: true
    grandTotal?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupplyOrderCountAggregateInputType = {
    id?: true
    gardenId?: true
    fertilizerTypeId?: true
    supplierId?: true
    sp2bjNumber?: true
    contractStartDate?: true
    contractEndDate?: true
    quantityOrdered?: true
    budgetType?: true
    unitPrice?: true
    freightCost?: true
    totalCost?: true
    ppnAmount?: true
    grandTotal?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SupplyOrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupplyOrder to aggregate.
     */
    where?: SupplyOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupplyOrders to fetch.
     */
    orderBy?: SupplyOrderOrderByWithRelationInput | SupplyOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupplyOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupplyOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupplyOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SupplyOrders
    **/
    _count?: true | SupplyOrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SupplyOrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SupplyOrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupplyOrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupplyOrderMaxAggregateInputType
  }

  export type GetSupplyOrderAggregateType<T extends SupplyOrderAggregateArgs> = {
        [P in keyof T & keyof AggregateSupplyOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupplyOrder[P]>
      : GetScalarType<T[P], AggregateSupplyOrder[P]>
  }




  export type SupplyOrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupplyOrderWhereInput
    orderBy?: SupplyOrderOrderByWithAggregationInput | SupplyOrderOrderByWithAggregationInput[]
    by: SupplyOrderScalarFieldEnum[] | SupplyOrderScalarFieldEnum
    having?: SupplyOrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupplyOrderCountAggregateInputType | true
    _avg?: SupplyOrderAvgAggregateInputType
    _sum?: SupplyOrderSumAggregateInputType
    _min?: SupplyOrderMinAggregateInputType
    _max?: SupplyOrderMaxAggregateInputType
  }

  export type SupplyOrderGroupByOutputType = {
    id: string
    gardenId: string
    fertilizerTypeId: string
    supplierId: string
    sp2bjNumber: string
    contractStartDate: Date
    contractEndDate: Date
    quantityOrdered: number
    budgetType: $Enums.SupplyBudgetType
    unitPrice: Decimal
    freightCost: Decimal
    totalCost: Decimal
    ppnAmount: Decimal
    grandTotal: Decimal
    createdById: string
    createdAt: Date
    updatedAt: Date
    _count: SupplyOrderCountAggregateOutputType | null
    _avg: SupplyOrderAvgAggregateOutputType | null
    _sum: SupplyOrderSumAggregateOutputType | null
    _min: SupplyOrderMinAggregateOutputType | null
    _max: SupplyOrderMaxAggregateOutputType | null
  }

  type GetSupplyOrderGroupByPayload<T extends SupplyOrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupplyOrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupplyOrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupplyOrderGroupByOutputType[P]>
            : GetScalarType<T[P], SupplyOrderGroupByOutputType[P]>
        }
      >
    >


  export type SupplyOrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gardenId?: boolean
    fertilizerTypeId?: boolean
    supplierId?: boolean
    sp2bjNumber?: boolean
    contractStartDate?: boolean
    contractEndDate?: boolean
    quantityOrdered?: boolean
    budgetType?: boolean
    unitPrice?: boolean
    freightCost?: boolean
    totalCost?: boolean
    ppnAmount?: boolean
    grandTotal?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    garden?: boolean | GardenDefaultArgs<ExtArgs>
    fertilizerType?: boolean | FertilizerTypeDefaultArgs<ExtArgs>
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    deliveries?: boolean | SupplyOrder$deliveriesArgs<ExtArgs>
    _count?: boolean | SupplyOrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supplyOrder"]>

  export type SupplyOrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gardenId?: boolean
    fertilizerTypeId?: boolean
    supplierId?: boolean
    sp2bjNumber?: boolean
    contractStartDate?: boolean
    contractEndDate?: boolean
    quantityOrdered?: boolean
    budgetType?: boolean
    unitPrice?: boolean
    freightCost?: boolean
    totalCost?: boolean
    ppnAmount?: boolean
    grandTotal?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    garden?: boolean | GardenDefaultArgs<ExtArgs>
    fertilizerType?: boolean | FertilizerTypeDefaultArgs<ExtArgs>
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supplyOrder"]>

  export type SupplyOrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gardenId?: boolean
    fertilizerTypeId?: boolean
    supplierId?: boolean
    sp2bjNumber?: boolean
    contractStartDate?: boolean
    contractEndDate?: boolean
    quantityOrdered?: boolean
    budgetType?: boolean
    unitPrice?: boolean
    freightCost?: boolean
    totalCost?: boolean
    ppnAmount?: boolean
    grandTotal?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    garden?: boolean | GardenDefaultArgs<ExtArgs>
    fertilizerType?: boolean | FertilizerTypeDefaultArgs<ExtArgs>
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supplyOrder"]>

  export type SupplyOrderSelectScalar = {
    id?: boolean
    gardenId?: boolean
    fertilizerTypeId?: boolean
    supplierId?: boolean
    sp2bjNumber?: boolean
    contractStartDate?: boolean
    contractEndDate?: boolean
    quantityOrdered?: boolean
    budgetType?: boolean
    unitPrice?: boolean
    freightCost?: boolean
    totalCost?: boolean
    ppnAmount?: boolean
    grandTotal?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SupplyOrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "gardenId" | "fertilizerTypeId" | "supplierId" | "sp2bjNumber" | "contractStartDate" | "contractEndDate" | "quantityOrdered" | "budgetType" | "unitPrice" | "freightCost" | "totalCost" | "ppnAmount" | "grandTotal" | "createdById" | "createdAt" | "updatedAt", ExtArgs["result"]["supplyOrder"]>
  export type SupplyOrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    garden?: boolean | GardenDefaultArgs<ExtArgs>
    fertilizerType?: boolean | FertilizerTypeDefaultArgs<ExtArgs>
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    deliveries?: boolean | SupplyOrder$deliveriesArgs<ExtArgs>
    _count?: boolean | SupplyOrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SupplyOrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    garden?: boolean | GardenDefaultArgs<ExtArgs>
    fertilizerType?: boolean | FertilizerTypeDefaultArgs<ExtArgs>
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SupplyOrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    garden?: boolean | GardenDefaultArgs<ExtArgs>
    fertilizerType?: boolean | FertilizerTypeDefaultArgs<ExtArgs>
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SupplyOrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SupplyOrder"
    objects: {
      garden: Prisma.$GardenPayload<ExtArgs>
      fertilizerType: Prisma.$FertilizerTypePayload<ExtArgs>
      supplier: Prisma.$SupplierPayload<ExtArgs>
      createdBy: Prisma.$UserPayload<ExtArgs>
      deliveries: Prisma.$DeliveryReceiptPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      gardenId: string
      fertilizerTypeId: string
      supplierId: string
      sp2bjNumber: string
      contractStartDate: Date
      contractEndDate: Date
      quantityOrdered: number
      budgetType: $Enums.SupplyBudgetType
      unitPrice: Prisma.Decimal
      freightCost: Prisma.Decimal
      totalCost: Prisma.Decimal
      ppnAmount: Prisma.Decimal
      grandTotal: Prisma.Decimal
      createdById: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["supplyOrder"]>
    composites: {}
  }

  type SupplyOrderGetPayload<S extends boolean | null | undefined | SupplyOrderDefaultArgs> = $Result.GetResult<Prisma.$SupplyOrderPayload, S>

  type SupplyOrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SupplyOrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SupplyOrderCountAggregateInputType | true
    }

  export interface SupplyOrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SupplyOrder'], meta: { name: 'SupplyOrder' } }
    /**
     * Find zero or one SupplyOrder that matches the filter.
     * @param {SupplyOrderFindUniqueArgs} args - Arguments to find a SupplyOrder
     * @example
     * // Get one SupplyOrder
     * const supplyOrder = await prisma.supplyOrder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupplyOrderFindUniqueArgs>(args: SelectSubset<T, SupplyOrderFindUniqueArgs<ExtArgs>>): Prisma__SupplyOrderClient<$Result.GetResult<Prisma.$SupplyOrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SupplyOrder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SupplyOrderFindUniqueOrThrowArgs} args - Arguments to find a SupplyOrder
     * @example
     * // Get one SupplyOrder
     * const supplyOrder = await prisma.supplyOrder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupplyOrderFindUniqueOrThrowArgs>(args: SelectSubset<T, SupplyOrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupplyOrderClient<$Result.GetResult<Prisma.$SupplyOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SupplyOrder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplyOrderFindFirstArgs} args - Arguments to find a SupplyOrder
     * @example
     * // Get one SupplyOrder
     * const supplyOrder = await prisma.supplyOrder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupplyOrderFindFirstArgs>(args?: SelectSubset<T, SupplyOrderFindFirstArgs<ExtArgs>>): Prisma__SupplyOrderClient<$Result.GetResult<Prisma.$SupplyOrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SupplyOrder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplyOrderFindFirstOrThrowArgs} args - Arguments to find a SupplyOrder
     * @example
     * // Get one SupplyOrder
     * const supplyOrder = await prisma.supplyOrder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupplyOrderFindFirstOrThrowArgs>(args?: SelectSubset<T, SupplyOrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupplyOrderClient<$Result.GetResult<Prisma.$SupplyOrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SupplyOrders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplyOrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SupplyOrders
     * const supplyOrders = await prisma.supplyOrder.findMany()
     * 
     * // Get first 10 SupplyOrders
     * const supplyOrders = await prisma.supplyOrder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supplyOrderWithIdOnly = await prisma.supplyOrder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupplyOrderFindManyArgs>(args?: SelectSubset<T, SupplyOrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplyOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SupplyOrder.
     * @param {SupplyOrderCreateArgs} args - Arguments to create a SupplyOrder.
     * @example
     * // Create one SupplyOrder
     * const SupplyOrder = await prisma.supplyOrder.create({
     *   data: {
     *     // ... data to create a SupplyOrder
     *   }
     * })
     * 
     */
    create<T extends SupplyOrderCreateArgs>(args: SelectSubset<T, SupplyOrderCreateArgs<ExtArgs>>): Prisma__SupplyOrderClient<$Result.GetResult<Prisma.$SupplyOrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SupplyOrders.
     * @param {SupplyOrderCreateManyArgs} args - Arguments to create many SupplyOrders.
     * @example
     * // Create many SupplyOrders
     * const supplyOrder = await prisma.supplyOrder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupplyOrderCreateManyArgs>(args?: SelectSubset<T, SupplyOrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SupplyOrders and returns the data saved in the database.
     * @param {SupplyOrderCreateManyAndReturnArgs} args - Arguments to create many SupplyOrders.
     * @example
     * // Create many SupplyOrders
     * const supplyOrder = await prisma.supplyOrder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SupplyOrders and only return the `id`
     * const supplyOrderWithIdOnly = await prisma.supplyOrder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SupplyOrderCreateManyAndReturnArgs>(args?: SelectSubset<T, SupplyOrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplyOrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SupplyOrder.
     * @param {SupplyOrderDeleteArgs} args - Arguments to delete one SupplyOrder.
     * @example
     * // Delete one SupplyOrder
     * const SupplyOrder = await prisma.supplyOrder.delete({
     *   where: {
     *     // ... filter to delete one SupplyOrder
     *   }
     * })
     * 
     */
    delete<T extends SupplyOrderDeleteArgs>(args: SelectSubset<T, SupplyOrderDeleteArgs<ExtArgs>>): Prisma__SupplyOrderClient<$Result.GetResult<Prisma.$SupplyOrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SupplyOrder.
     * @param {SupplyOrderUpdateArgs} args - Arguments to update one SupplyOrder.
     * @example
     * // Update one SupplyOrder
     * const supplyOrder = await prisma.supplyOrder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupplyOrderUpdateArgs>(args: SelectSubset<T, SupplyOrderUpdateArgs<ExtArgs>>): Prisma__SupplyOrderClient<$Result.GetResult<Prisma.$SupplyOrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SupplyOrders.
     * @param {SupplyOrderDeleteManyArgs} args - Arguments to filter SupplyOrders to delete.
     * @example
     * // Delete a few SupplyOrders
     * const { count } = await prisma.supplyOrder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupplyOrderDeleteManyArgs>(args?: SelectSubset<T, SupplyOrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupplyOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplyOrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SupplyOrders
     * const supplyOrder = await prisma.supplyOrder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupplyOrderUpdateManyArgs>(args: SelectSubset<T, SupplyOrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupplyOrders and returns the data updated in the database.
     * @param {SupplyOrderUpdateManyAndReturnArgs} args - Arguments to update many SupplyOrders.
     * @example
     * // Update many SupplyOrders
     * const supplyOrder = await prisma.supplyOrder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SupplyOrders and only return the `id`
     * const supplyOrderWithIdOnly = await prisma.supplyOrder.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SupplyOrderUpdateManyAndReturnArgs>(args: SelectSubset<T, SupplyOrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplyOrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SupplyOrder.
     * @param {SupplyOrderUpsertArgs} args - Arguments to update or create a SupplyOrder.
     * @example
     * // Update or create a SupplyOrder
     * const supplyOrder = await prisma.supplyOrder.upsert({
     *   create: {
     *     // ... data to create a SupplyOrder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SupplyOrder we want to update
     *   }
     * })
     */
    upsert<T extends SupplyOrderUpsertArgs>(args: SelectSubset<T, SupplyOrderUpsertArgs<ExtArgs>>): Prisma__SupplyOrderClient<$Result.GetResult<Prisma.$SupplyOrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SupplyOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplyOrderCountArgs} args - Arguments to filter SupplyOrders to count.
     * @example
     * // Count the number of SupplyOrders
     * const count = await prisma.supplyOrder.count({
     *   where: {
     *     // ... the filter for the SupplyOrders we want to count
     *   }
     * })
    **/
    count<T extends SupplyOrderCountArgs>(
      args?: Subset<T, SupplyOrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupplyOrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SupplyOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplyOrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SupplyOrderAggregateArgs>(args: Subset<T, SupplyOrderAggregateArgs>): Prisma.PrismaPromise<GetSupplyOrderAggregateType<T>>

    /**
     * Group by SupplyOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplyOrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SupplyOrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupplyOrderGroupByArgs['orderBy'] }
        : { orderBy?: SupplyOrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SupplyOrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupplyOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SupplyOrder model
   */
  readonly fields: SupplyOrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SupplyOrder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupplyOrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    garden<T extends GardenDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GardenDefaultArgs<ExtArgs>>): Prisma__GardenClient<$Result.GetResult<Prisma.$GardenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    fertilizerType<T extends FertilizerTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FertilizerTypeDefaultArgs<ExtArgs>>): Prisma__FertilizerTypeClient<$Result.GetResult<Prisma.$FertilizerTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    supplier<T extends SupplierDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SupplierDefaultArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    deliveries<T extends SupplyOrder$deliveriesArgs<ExtArgs> = {}>(args?: Subset<T, SupplyOrder$deliveriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SupplyOrder model
   */
  interface SupplyOrderFieldRefs {
    readonly id: FieldRef<"SupplyOrder", 'String'>
    readonly gardenId: FieldRef<"SupplyOrder", 'String'>
    readonly fertilizerTypeId: FieldRef<"SupplyOrder", 'String'>
    readonly supplierId: FieldRef<"SupplyOrder", 'String'>
    readonly sp2bjNumber: FieldRef<"SupplyOrder", 'String'>
    readonly contractStartDate: FieldRef<"SupplyOrder", 'DateTime'>
    readonly contractEndDate: FieldRef<"SupplyOrder", 'DateTime'>
    readonly quantityOrdered: FieldRef<"SupplyOrder", 'Int'>
    readonly budgetType: FieldRef<"SupplyOrder", 'SupplyBudgetType'>
    readonly unitPrice: FieldRef<"SupplyOrder", 'Decimal'>
    readonly freightCost: FieldRef<"SupplyOrder", 'Decimal'>
    readonly totalCost: FieldRef<"SupplyOrder", 'Decimal'>
    readonly ppnAmount: FieldRef<"SupplyOrder", 'Decimal'>
    readonly grandTotal: FieldRef<"SupplyOrder", 'Decimal'>
    readonly createdById: FieldRef<"SupplyOrder", 'String'>
    readonly createdAt: FieldRef<"SupplyOrder", 'DateTime'>
    readonly updatedAt: FieldRef<"SupplyOrder", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SupplyOrder findUnique
   */
  export type SupplyOrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplyOrder
     */
    select?: SupplyOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplyOrder
     */
    omit?: SupplyOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyOrderInclude<ExtArgs> | null
    /**
     * Filter, which SupplyOrder to fetch.
     */
    where: SupplyOrderWhereUniqueInput
  }

  /**
   * SupplyOrder findUniqueOrThrow
   */
  export type SupplyOrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplyOrder
     */
    select?: SupplyOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplyOrder
     */
    omit?: SupplyOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyOrderInclude<ExtArgs> | null
    /**
     * Filter, which SupplyOrder to fetch.
     */
    where: SupplyOrderWhereUniqueInput
  }

  /**
   * SupplyOrder findFirst
   */
  export type SupplyOrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplyOrder
     */
    select?: SupplyOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplyOrder
     */
    omit?: SupplyOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyOrderInclude<ExtArgs> | null
    /**
     * Filter, which SupplyOrder to fetch.
     */
    where?: SupplyOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupplyOrders to fetch.
     */
    orderBy?: SupplyOrderOrderByWithRelationInput | SupplyOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupplyOrders.
     */
    cursor?: SupplyOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupplyOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupplyOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupplyOrders.
     */
    distinct?: SupplyOrderScalarFieldEnum | SupplyOrderScalarFieldEnum[]
  }

  /**
   * SupplyOrder findFirstOrThrow
   */
  export type SupplyOrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplyOrder
     */
    select?: SupplyOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplyOrder
     */
    omit?: SupplyOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyOrderInclude<ExtArgs> | null
    /**
     * Filter, which SupplyOrder to fetch.
     */
    where?: SupplyOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupplyOrders to fetch.
     */
    orderBy?: SupplyOrderOrderByWithRelationInput | SupplyOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupplyOrders.
     */
    cursor?: SupplyOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupplyOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupplyOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupplyOrders.
     */
    distinct?: SupplyOrderScalarFieldEnum | SupplyOrderScalarFieldEnum[]
  }

  /**
   * SupplyOrder findMany
   */
  export type SupplyOrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplyOrder
     */
    select?: SupplyOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplyOrder
     */
    omit?: SupplyOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyOrderInclude<ExtArgs> | null
    /**
     * Filter, which SupplyOrders to fetch.
     */
    where?: SupplyOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupplyOrders to fetch.
     */
    orderBy?: SupplyOrderOrderByWithRelationInput | SupplyOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SupplyOrders.
     */
    cursor?: SupplyOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupplyOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupplyOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupplyOrders.
     */
    distinct?: SupplyOrderScalarFieldEnum | SupplyOrderScalarFieldEnum[]
  }

  /**
   * SupplyOrder create
   */
  export type SupplyOrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplyOrder
     */
    select?: SupplyOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplyOrder
     */
    omit?: SupplyOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyOrderInclude<ExtArgs> | null
    /**
     * The data needed to create a SupplyOrder.
     */
    data: XOR<SupplyOrderCreateInput, SupplyOrderUncheckedCreateInput>
  }

  /**
   * SupplyOrder createMany
   */
  export type SupplyOrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SupplyOrders.
     */
    data: SupplyOrderCreateManyInput | SupplyOrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SupplyOrder createManyAndReturn
   */
  export type SupplyOrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplyOrder
     */
    select?: SupplyOrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SupplyOrder
     */
    omit?: SupplyOrderOmit<ExtArgs> | null
    /**
     * The data used to create many SupplyOrders.
     */
    data: SupplyOrderCreateManyInput | SupplyOrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyOrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SupplyOrder update
   */
  export type SupplyOrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplyOrder
     */
    select?: SupplyOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplyOrder
     */
    omit?: SupplyOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyOrderInclude<ExtArgs> | null
    /**
     * The data needed to update a SupplyOrder.
     */
    data: XOR<SupplyOrderUpdateInput, SupplyOrderUncheckedUpdateInput>
    /**
     * Choose, which SupplyOrder to update.
     */
    where: SupplyOrderWhereUniqueInput
  }

  /**
   * SupplyOrder updateMany
   */
  export type SupplyOrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SupplyOrders.
     */
    data: XOR<SupplyOrderUpdateManyMutationInput, SupplyOrderUncheckedUpdateManyInput>
    /**
     * Filter which SupplyOrders to update
     */
    where?: SupplyOrderWhereInput
    /**
     * Limit how many SupplyOrders to update.
     */
    limit?: number
  }

  /**
   * SupplyOrder updateManyAndReturn
   */
  export type SupplyOrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplyOrder
     */
    select?: SupplyOrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SupplyOrder
     */
    omit?: SupplyOrderOmit<ExtArgs> | null
    /**
     * The data used to update SupplyOrders.
     */
    data: XOR<SupplyOrderUpdateManyMutationInput, SupplyOrderUncheckedUpdateManyInput>
    /**
     * Filter which SupplyOrders to update
     */
    where?: SupplyOrderWhereInput
    /**
     * Limit how many SupplyOrders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyOrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SupplyOrder upsert
   */
  export type SupplyOrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplyOrder
     */
    select?: SupplyOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplyOrder
     */
    omit?: SupplyOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyOrderInclude<ExtArgs> | null
    /**
     * The filter to search for the SupplyOrder to update in case it exists.
     */
    where: SupplyOrderWhereUniqueInput
    /**
     * In case the SupplyOrder found by the `where` argument doesn't exist, create a new SupplyOrder with this data.
     */
    create: XOR<SupplyOrderCreateInput, SupplyOrderUncheckedCreateInput>
    /**
     * In case the SupplyOrder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupplyOrderUpdateInput, SupplyOrderUncheckedUpdateInput>
  }

  /**
   * SupplyOrder delete
   */
  export type SupplyOrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplyOrder
     */
    select?: SupplyOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplyOrder
     */
    omit?: SupplyOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyOrderInclude<ExtArgs> | null
    /**
     * Filter which SupplyOrder to delete.
     */
    where: SupplyOrderWhereUniqueInput
  }

  /**
   * SupplyOrder deleteMany
   */
  export type SupplyOrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupplyOrders to delete
     */
    where?: SupplyOrderWhereInput
    /**
     * Limit how many SupplyOrders to delete.
     */
    limit?: number
  }

  /**
   * SupplyOrder.deliveries
   */
  export type SupplyOrder$deliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryReceiptInclude<ExtArgs> | null
    where?: DeliveryReceiptWhereInput
    orderBy?: DeliveryReceiptOrderByWithRelationInput | DeliveryReceiptOrderByWithRelationInput[]
    cursor?: DeliveryReceiptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeliveryReceiptScalarFieldEnum | DeliveryReceiptScalarFieldEnum[]
  }

  /**
   * SupplyOrder without action
   */
  export type SupplyOrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplyOrder
     */
    select?: SupplyOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplyOrder
     */
    omit?: SupplyOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyOrderInclude<ExtArgs> | null
  }


  /**
   * Model DeliveryReceipt
   */

  export type AggregateDeliveryReceipt = {
    _count: DeliveryReceiptCountAggregateOutputType | null
    _avg: DeliveryReceiptAvgAggregateOutputType | null
    _sum: DeliveryReceiptSumAggregateOutputType | null
    _min: DeliveryReceiptMinAggregateOutputType | null
    _max: DeliveryReceiptMaxAggregateOutputType | null
  }

  export type DeliveryReceiptAvgAggregateOutputType = {
    quantityDelivered: number | null
    sackCount: number | null
  }

  export type DeliveryReceiptSumAggregateOutputType = {
    quantityDelivered: number | null
    sackCount: number | null
  }

  export type DeliveryReceiptMinAggregateOutputType = {
    id: string | null
    supplyOrderId: string | null
    licensePlate: string | null
    receivedDate: Date | null
    quantityDelivered: number | null
    sackCount: number | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeliveryReceiptMaxAggregateOutputType = {
    id: string | null
    supplyOrderId: string | null
    licensePlate: string | null
    receivedDate: Date | null
    quantityDelivered: number | null
    sackCount: number | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeliveryReceiptCountAggregateOutputType = {
    id: number
    supplyOrderId: number
    licensePlate: number
    receivedDate: number
    quantityDelivered: number
    sackCount: number
    createdById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DeliveryReceiptAvgAggregateInputType = {
    quantityDelivered?: true
    sackCount?: true
  }

  export type DeliveryReceiptSumAggregateInputType = {
    quantityDelivered?: true
    sackCount?: true
  }

  export type DeliveryReceiptMinAggregateInputType = {
    id?: true
    supplyOrderId?: true
    licensePlate?: true
    receivedDate?: true
    quantityDelivered?: true
    sackCount?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeliveryReceiptMaxAggregateInputType = {
    id?: true
    supplyOrderId?: true
    licensePlate?: true
    receivedDate?: true
    quantityDelivered?: true
    sackCount?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeliveryReceiptCountAggregateInputType = {
    id?: true
    supplyOrderId?: true
    licensePlate?: true
    receivedDate?: true
    quantityDelivered?: true
    sackCount?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DeliveryReceiptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeliveryReceipt to aggregate.
     */
    where?: DeliveryReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryReceipts to fetch.
     */
    orderBy?: DeliveryReceiptOrderByWithRelationInput | DeliveryReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeliveryReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryReceipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryReceipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DeliveryReceipts
    **/
    _count?: true | DeliveryReceiptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeliveryReceiptAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeliveryReceiptSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeliveryReceiptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeliveryReceiptMaxAggregateInputType
  }

  export type GetDeliveryReceiptAggregateType<T extends DeliveryReceiptAggregateArgs> = {
        [P in keyof T & keyof AggregateDeliveryReceipt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeliveryReceipt[P]>
      : GetScalarType<T[P], AggregateDeliveryReceipt[P]>
  }




  export type DeliveryReceiptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeliveryReceiptWhereInput
    orderBy?: DeliveryReceiptOrderByWithAggregationInput | DeliveryReceiptOrderByWithAggregationInput[]
    by: DeliveryReceiptScalarFieldEnum[] | DeliveryReceiptScalarFieldEnum
    having?: DeliveryReceiptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeliveryReceiptCountAggregateInputType | true
    _avg?: DeliveryReceiptAvgAggregateInputType
    _sum?: DeliveryReceiptSumAggregateInputType
    _min?: DeliveryReceiptMinAggregateInputType
    _max?: DeliveryReceiptMaxAggregateInputType
  }

  export type DeliveryReceiptGroupByOutputType = {
    id: string
    supplyOrderId: string
    licensePlate: string
    receivedDate: Date
    quantityDelivered: number
    sackCount: number
    createdById: string
    createdAt: Date
    updatedAt: Date
    _count: DeliveryReceiptCountAggregateOutputType | null
    _avg: DeliveryReceiptAvgAggregateOutputType | null
    _sum: DeliveryReceiptSumAggregateOutputType | null
    _min: DeliveryReceiptMinAggregateOutputType | null
    _max: DeliveryReceiptMaxAggregateOutputType | null
  }

  type GetDeliveryReceiptGroupByPayload<T extends DeliveryReceiptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeliveryReceiptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeliveryReceiptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeliveryReceiptGroupByOutputType[P]>
            : GetScalarType<T[P], DeliveryReceiptGroupByOutputType[P]>
        }
      >
    >


  export type DeliveryReceiptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    supplyOrderId?: boolean
    licensePlate?: boolean
    receivedDate?: boolean
    quantityDelivered?: boolean
    sackCount?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    supplyOrder?: boolean | SupplyOrderDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deliveryReceipt"]>

  export type DeliveryReceiptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    supplyOrderId?: boolean
    licensePlate?: boolean
    receivedDate?: boolean
    quantityDelivered?: boolean
    sackCount?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    supplyOrder?: boolean | SupplyOrderDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deliveryReceipt"]>

  export type DeliveryReceiptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    supplyOrderId?: boolean
    licensePlate?: boolean
    receivedDate?: boolean
    quantityDelivered?: boolean
    sackCount?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    supplyOrder?: boolean | SupplyOrderDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deliveryReceipt"]>

  export type DeliveryReceiptSelectScalar = {
    id?: boolean
    supplyOrderId?: boolean
    licensePlate?: boolean
    receivedDate?: boolean
    quantityDelivered?: boolean
    sackCount?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DeliveryReceiptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "supplyOrderId" | "licensePlate" | "receivedDate" | "quantityDelivered" | "sackCount" | "createdById" | "createdAt" | "updatedAt", ExtArgs["result"]["deliveryReceipt"]>
  export type DeliveryReceiptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supplyOrder?: boolean | SupplyOrderDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DeliveryReceiptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supplyOrder?: boolean | SupplyOrderDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DeliveryReceiptIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supplyOrder?: boolean | SupplyOrderDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DeliveryReceiptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DeliveryReceipt"
    objects: {
      supplyOrder: Prisma.$SupplyOrderPayload<ExtArgs>
      createdBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      supplyOrderId: string
      licensePlate: string
      receivedDate: Date
      quantityDelivered: number
      sackCount: number
      createdById: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["deliveryReceipt"]>
    composites: {}
  }

  type DeliveryReceiptGetPayload<S extends boolean | null | undefined | DeliveryReceiptDefaultArgs> = $Result.GetResult<Prisma.$DeliveryReceiptPayload, S>

  type DeliveryReceiptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeliveryReceiptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeliveryReceiptCountAggregateInputType | true
    }

  export interface DeliveryReceiptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DeliveryReceipt'], meta: { name: 'DeliveryReceipt' } }
    /**
     * Find zero or one DeliveryReceipt that matches the filter.
     * @param {DeliveryReceiptFindUniqueArgs} args - Arguments to find a DeliveryReceipt
     * @example
     * // Get one DeliveryReceipt
     * const deliveryReceipt = await prisma.deliveryReceipt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeliveryReceiptFindUniqueArgs>(args: SelectSubset<T, DeliveryReceiptFindUniqueArgs<ExtArgs>>): Prisma__DeliveryReceiptClient<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DeliveryReceipt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeliveryReceiptFindUniqueOrThrowArgs} args - Arguments to find a DeliveryReceipt
     * @example
     * // Get one DeliveryReceipt
     * const deliveryReceipt = await prisma.deliveryReceipt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeliveryReceiptFindUniqueOrThrowArgs>(args: SelectSubset<T, DeliveryReceiptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeliveryReceiptClient<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeliveryReceipt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryReceiptFindFirstArgs} args - Arguments to find a DeliveryReceipt
     * @example
     * // Get one DeliveryReceipt
     * const deliveryReceipt = await prisma.deliveryReceipt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeliveryReceiptFindFirstArgs>(args?: SelectSubset<T, DeliveryReceiptFindFirstArgs<ExtArgs>>): Prisma__DeliveryReceiptClient<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeliveryReceipt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryReceiptFindFirstOrThrowArgs} args - Arguments to find a DeliveryReceipt
     * @example
     * // Get one DeliveryReceipt
     * const deliveryReceipt = await prisma.deliveryReceipt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeliveryReceiptFindFirstOrThrowArgs>(args?: SelectSubset<T, DeliveryReceiptFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeliveryReceiptClient<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DeliveryReceipts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryReceiptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeliveryReceipts
     * const deliveryReceipts = await prisma.deliveryReceipt.findMany()
     * 
     * // Get first 10 DeliveryReceipts
     * const deliveryReceipts = await prisma.deliveryReceipt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deliveryReceiptWithIdOnly = await prisma.deliveryReceipt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeliveryReceiptFindManyArgs>(args?: SelectSubset<T, DeliveryReceiptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DeliveryReceipt.
     * @param {DeliveryReceiptCreateArgs} args - Arguments to create a DeliveryReceipt.
     * @example
     * // Create one DeliveryReceipt
     * const DeliveryReceipt = await prisma.deliveryReceipt.create({
     *   data: {
     *     // ... data to create a DeliveryReceipt
     *   }
     * })
     * 
     */
    create<T extends DeliveryReceiptCreateArgs>(args: SelectSubset<T, DeliveryReceiptCreateArgs<ExtArgs>>): Prisma__DeliveryReceiptClient<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DeliveryReceipts.
     * @param {DeliveryReceiptCreateManyArgs} args - Arguments to create many DeliveryReceipts.
     * @example
     * // Create many DeliveryReceipts
     * const deliveryReceipt = await prisma.deliveryReceipt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeliveryReceiptCreateManyArgs>(args?: SelectSubset<T, DeliveryReceiptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DeliveryReceipts and returns the data saved in the database.
     * @param {DeliveryReceiptCreateManyAndReturnArgs} args - Arguments to create many DeliveryReceipts.
     * @example
     * // Create many DeliveryReceipts
     * const deliveryReceipt = await prisma.deliveryReceipt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DeliveryReceipts and only return the `id`
     * const deliveryReceiptWithIdOnly = await prisma.deliveryReceipt.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeliveryReceiptCreateManyAndReturnArgs>(args?: SelectSubset<T, DeliveryReceiptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DeliveryReceipt.
     * @param {DeliveryReceiptDeleteArgs} args - Arguments to delete one DeliveryReceipt.
     * @example
     * // Delete one DeliveryReceipt
     * const DeliveryReceipt = await prisma.deliveryReceipt.delete({
     *   where: {
     *     // ... filter to delete one DeliveryReceipt
     *   }
     * })
     * 
     */
    delete<T extends DeliveryReceiptDeleteArgs>(args: SelectSubset<T, DeliveryReceiptDeleteArgs<ExtArgs>>): Prisma__DeliveryReceiptClient<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DeliveryReceipt.
     * @param {DeliveryReceiptUpdateArgs} args - Arguments to update one DeliveryReceipt.
     * @example
     * // Update one DeliveryReceipt
     * const deliveryReceipt = await prisma.deliveryReceipt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeliveryReceiptUpdateArgs>(args: SelectSubset<T, DeliveryReceiptUpdateArgs<ExtArgs>>): Prisma__DeliveryReceiptClient<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DeliveryReceipts.
     * @param {DeliveryReceiptDeleteManyArgs} args - Arguments to filter DeliveryReceipts to delete.
     * @example
     * // Delete a few DeliveryReceipts
     * const { count } = await prisma.deliveryReceipt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeliveryReceiptDeleteManyArgs>(args?: SelectSubset<T, DeliveryReceiptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeliveryReceipts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryReceiptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeliveryReceipts
     * const deliveryReceipt = await prisma.deliveryReceipt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeliveryReceiptUpdateManyArgs>(args: SelectSubset<T, DeliveryReceiptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeliveryReceipts and returns the data updated in the database.
     * @param {DeliveryReceiptUpdateManyAndReturnArgs} args - Arguments to update many DeliveryReceipts.
     * @example
     * // Update many DeliveryReceipts
     * const deliveryReceipt = await prisma.deliveryReceipt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DeliveryReceipts and only return the `id`
     * const deliveryReceiptWithIdOnly = await prisma.deliveryReceipt.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DeliveryReceiptUpdateManyAndReturnArgs>(args: SelectSubset<T, DeliveryReceiptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DeliveryReceipt.
     * @param {DeliveryReceiptUpsertArgs} args - Arguments to update or create a DeliveryReceipt.
     * @example
     * // Update or create a DeliveryReceipt
     * const deliveryReceipt = await prisma.deliveryReceipt.upsert({
     *   create: {
     *     // ... data to create a DeliveryReceipt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeliveryReceipt we want to update
     *   }
     * })
     */
    upsert<T extends DeliveryReceiptUpsertArgs>(args: SelectSubset<T, DeliveryReceiptUpsertArgs<ExtArgs>>): Prisma__DeliveryReceiptClient<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DeliveryReceipts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryReceiptCountArgs} args - Arguments to filter DeliveryReceipts to count.
     * @example
     * // Count the number of DeliveryReceipts
     * const count = await prisma.deliveryReceipt.count({
     *   where: {
     *     // ... the filter for the DeliveryReceipts we want to count
     *   }
     * })
    **/
    count<T extends DeliveryReceiptCountArgs>(
      args?: Subset<T, DeliveryReceiptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeliveryReceiptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DeliveryReceipt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryReceiptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeliveryReceiptAggregateArgs>(args: Subset<T, DeliveryReceiptAggregateArgs>): Prisma.PrismaPromise<GetDeliveryReceiptAggregateType<T>>

    /**
     * Group by DeliveryReceipt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryReceiptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeliveryReceiptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeliveryReceiptGroupByArgs['orderBy'] }
        : { orderBy?: DeliveryReceiptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeliveryReceiptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeliveryReceiptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DeliveryReceipt model
   */
  readonly fields: DeliveryReceiptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DeliveryReceipt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeliveryReceiptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    supplyOrder<T extends SupplyOrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SupplyOrderDefaultArgs<ExtArgs>>): Prisma__SupplyOrderClient<$Result.GetResult<Prisma.$SupplyOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DeliveryReceipt model
   */
  interface DeliveryReceiptFieldRefs {
    readonly id: FieldRef<"DeliveryReceipt", 'String'>
    readonly supplyOrderId: FieldRef<"DeliveryReceipt", 'String'>
    readonly licensePlate: FieldRef<"DeliveryReceipt", 'String'>
    readonly receivedDate: FieldRef<"DeliveryReceipt", 'DateTime'>
    readonly quantityDelivered: FieldRef<"DeliveryReceipt", 'Int'>
    readonly sackCount: FieldRef<"DeliveryReceipt", 'Int'>
    readonly createdById: FieldRef<"DeliveryReceipt", 'String'>
    readonly createdAt: FieldRef<"DeliveryReceipt", 'DateTime'>
    readonly updatedAt: FieldRef<"DeliveryReceipt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DeliveryReceipt findUnique
   */
  export type DeliveryReceiptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryReceiptInclude<ExtArgs> | null
    /**
     * Filter, which DeliveryReceipt to fetch.
     */
    where: DeliveryReceiptWhereUniqueInput
  }

  /**
   * DeliveryReceipt findUniqueOrThrow
   */
  export type DeliveryReceiptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryReceiptInclude<ExtArgs> | null
    /**
     * Filter, which DeliveryReceipt to fetch.
     */
    where: DeliveryReceiptWhereUniqueInput
  }

  /**
   * DeliveryReceipt findFirst
   */
  export type DeliveryReceiptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryReceiptInclude<ExtArgs> | null
    /**
     * Filter, which DeliveryReceipt to fetch.
     */
    where?: DeliveryReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryReceipts to fetch.
     */
    orderBy?: DeliveryReceiptOrderByWithRelationInput | DeliveryReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeliveryReceipts.
     */
    cursor?: DeliveryReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryReceipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryReceipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeliveryReceipts.
     */
    distinct?: DeliveryReceiptScalarFieldEnum | DeliveryReceiptScalarFieldEnum[]
  }

  /**
   * DeliveryReceipt findFirstOrThrow
   */
  export type DeliveryReceiptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryReceiptInclude<ExtArgs> | null
    /**
     * Filter, which DeliveryReceipt to fetch.
     */
    where?: DeliveryReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryReceipts to fetch.
     */
    orderBy?: DeliveryReceiptOrderByWithRelationInput | DeliveryReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeliveryReceipts.
     */
    cursor?: DeliveryReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryReceipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryReceipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeliveryReceipts.
     */
    distinct?: DeliveryReceiptScalarFieldEnum | DeliveryReceiptScalarFieldEnum[]
  }

  /**
   * DeliveryReceipt findMany
   */
  export type DeliveryReceiptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryReceiptInclude<ExtArgs> | null
    /**
     * Filter, which DeliveryReceipts to fetch.
     */
    where?: DeliveryReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryReceipts to fetch.
     */
    orderBy?: DeliveryReceiptOrderByWithRelationInput | DeliveryReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DeliveryReceipts.
     */
    cursor?: DeliveryReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryReceipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryReceipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeliveryReceipts.
     */
    distinct?: DeliveryReceiptScalarFieldEnum | DeliveryReceiptScalarFieldEnum[]
  }

  /**
   * DeliveryReceipt create
   */
  export type DeliveryReceiptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryReceiptInclude<ExtArgs> | null
    /**
     * The data needed to create a DeliveryReceipt.
     */
    data: XOR<DeliveryReceiptCreateInput, DeliveryReceiptUncheckedCreateInput>
  }

  /**
   * DeliveryReceipt createMany
   */
  export type DeliveryReceiptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DeliveryReceipts.
     */
    data: DeliveryReceiptCreateManyInput | DeliveryReceiptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DeliveryReceipt createManyAndReturn
   */
  export type DeliveryReceiptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * The data used to create many DeliveryReceipts.
     */
    data: DeliveryReceiptCreateManyInput | DeliveryReceiptCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryReceiptIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DeliveryReceipt update
   */
  export type DeliveryReceiptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryReceiptInclude<ExtArgs> | null
    /**
     * The data needed to update a DeliveryReceipt.
     */
    data: XOR<DeliveryReceiptUpdateInput, DeliveryReceiptUncheckedUpdateInput>
    /**
     * Choose, which DeliveryReceipt to update.
     */
    where: DeliveryReceiptWhereUniqueInput
  }

  /**
   * DeliveryReceipt updateMany
   */
  export type DeliveryReceiptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DeliveryReceipts.
     */
    data: XOR<DeliveryReceiptUpdateManyMutationInput, DeliveryReceiptUncheckedUpdateManyInput>
    /**
     * Filter which DeliveryReceipts to update
     */
    where?: DeliveryReceiptWhereInput
    /**
     * Limit how many DeliveryReceipts to update.
     */
    limit?: number
  }

  /**
   * DeliveryReceipt updateManyAndReturn
   */
  export type DeliveryReceiptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * The data used to update DeliveryReceipts.
     */
    data: XOR<DeliveryReceiptUpdateManyMutationInput, DeliveryReceiptUncheckedUpdateManyInput>
    /**
     * Filter which DeliveryReceipts to update
     */
    where?: DeliveryReceiptWhereInput
    /**
     * Limit how many DeliveryReceipts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryReceiptIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DeliveryReceipt upsert
   */
  export type DeliveryReceiptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryReceiptInclude<ExtArgs> | null
    /**
     * The filter to search for the DeliveryReceipt to update in case it exists.
     */
    where: DeliveryReceiptWhereUniqueInput
    /**
     * In case the DeliveryReceipt found by the `where` argument doesn't exist, create a new DeliveryReceipt with this data.
     */
    create: XOR<DeliveryReceiptCreateInput, DeliveryReceiptUncheckedCreateInput>
    /**
     * In case the DeliveryReceipt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeliveryReceiptUpdateInput, DeliveryReceiptUncheckedUpdateInput>
  }

  /**
   * DeliveryReceipt delete
   */
  export type DeliveryReceiptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryReceiptInclude<ExtArgs> | null
    /**
     * Filter which DeliveryReceipt to delete.
     */
    where: DeliveryReceiptWhereUniqueInput
  }

  /**
   * DeliveryReceipt deleteMany
   */
  export type DeliveryReceiptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeliveryReceipts to delete
     */
    where?: DeliveryReceiptWhereInput
    /**
     * Limit how many DeliveryReceipts to delete.
     */
    limit?: number
  }

  /**
   * DeliveryReceipt without action
   */
  export type DeliveryReceiptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryReceiptInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    isActive: 'isActive',
    assignedGardenId: 'assignedGardenId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RolePermissionScalarFieldEnum: {
    role: 'role',
    gardenViewScope: 'gardenViewScope',
    gardenEditScope: 'gardenEditScope',
    gardenDeleteScope: 'gardenDeleteScope',
    canAccessAdminHome: 'canAccessAdminHome',
    canAccessSupplyInput: 'canAccessSupplyInput',
    canAccessSupplyList: 'canAccessSupplyList',
    canAccessMasterGardens: 'canAccessMasterGardens',
    canAccessMasterFertilizers: 'canAccessMasterFertilizers',
    canAccessMasterSuppliers: 'canAccessMasterSuppliers',
    canAccessSupplierInformation: 'canAccessSupplierInformation',
    canAccessUserManagement: 'canAccessUserManagement',
    canAccessAdminDelivery: 'canAccessAdminDelivery',
    canAccessKraniHome: 'canAccessKraniHome',
    canAccessDeliveryWorkspace: 'canAccessDeliveryWorkspace',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RolePermissionScalarFieldEnum = (typeof RolePermissionScalarFieldEnum)[keyof typeof RolePermissionScalarFieldEnum]


  export const GardenScalarFieldEnum: {
    id: 'id',
    name: 'name',
    code: 'code',
    address: 'address',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GardenScalarFieldEnum = (typeof GardenScalarFieldEnum)[keyof typeof GardenScalarFieldEnum]


  export const FertilizerTypeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    unit: 'unit',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FertilizerTypeScalarFieldEnum = (typeof FertilizerTypeScalarFieldEnum)[keyof typeof FertilizerTypeScalarFieldEnum]


  export const SupplierScalarFieldEnum: {
    id: 'id',
    name: 'name',
    contactName: 'contactName',
    address: 'address',
    phone: 'phone',
    email: 'email',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SupplierScalarFieldEnum = (typeof SupplierScalarFieldEnum)[keyof typeof SupplierScalarFieldEnum]


  export const SupplyOrderScalarFieldEnum: {
    id: 'id',
    gardenId: 'gardenId',
    fertilizerTypeId: 'fertilizerTypeId',
    supplierId: 'supplierId',
    sp2bjNumber: 'sp2bjNumber',
    contractStartDate: 'contractStartDate',
    contractEndDate: 'contractEndDate',
    quantityOrdered: 'quantityOrdered',
    budgetType: 'budgetType',
    unitPrice: 'unitPrice',
    freightCost: 'freightCost',
    totalCost: 'totalCost',
    ppnAmount: 'ppnAmount',
    grandTotal: 'grandTotal',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SupplyOrderScalarFieldEnum = (typeof SupplyOrderScalarFieldEnum)[keyof typeof SupplyOrderScalarFieldEnum]


  export const DeliveryReceiptScalarFieldEnum: {
    id: 'id',
    supplyOrderId: 'supplyOrderId',
    licensePlate: 'licensePlate',
    receivedDate: 'receivedDate',
    quantityDelivered: 'quantityDelivered',
    sackCount: 'sackCount',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DeliveryReceiptScalarFieldEnum = (typeof DeliveryReceiptScalarFieldEnum)[keyof typeof DeliveryReceiptScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'GardenAccessScope'
   */
  export type EnumGardenAccessScopeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GardenAccessScope'>
    


  /**
   * Reference to a field of type 'GardenAccessScope[]'
   */
  export type ListEnumGardenAccessScopeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GardenAccessScope[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'SupplyBudgetType'
   */
  export type EnumSupplyBudgetTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SupplyBudgetType'>
    


  /**
   * Reference to a field of type 'SupplyBudgetType[]'
   */
  export type ListEnumSupplyBudgetTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SupplyBudgetType[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isActive?: BoolFilter<"User"> | boolean
    assignedGardenId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    assignedGarden?: XOR<GardenNullableScalarRelationFilter, GardenWhereInput> | null
    createdSupply?: SupplyOrderListRelationFilter
    createdDeliveries?: DeliveryReceiptListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    assignedGardenId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assignedGarden?: GardenOrderByWithRelationInput
    createdSupply?: SupplyOrderOrderByRelationAggregateInput
    createdDeliveries?: DeliveryReceiptOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isActive?: BoolFilter<"User"> | boolean
    assignedGardenId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    assignedGarden?: XOR<GardenNullableScalarRelationFilter, GardenWhereInput> | null
    createdSupply?: SupplyOrderListRelationFilter
    createdDeliveries?: DeliveryReceiptListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    assignedGardenId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    assignedGardenId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type RolePermissionWhereInput = {
    AND?: RolePermissionWhereInput | RolePermissionWhereInput[]
    OR?: RolePermissionWhereInput[]
    NOT?: RolePermissionWhereInput | RolePermissionWhereInput[]
    role?: EnumUserRoleFilter<"RolePermission"> | $Enums.UserRole
    gardenViewScope?: EnumGardenAccessScopeFilter<"RolePermission"> | $Enums.GardenAccessScope
    gardenEditScope?: EnumGardenAccessScopeFilter<"RolePermission"> | $Enums.GardenAccessScope
    gardenDeleteScope?: EnumGardenAccessScopeFilter<"RolePermission"> | $Enums.GardenAccessScope
    canAccessAdminHome?: BoolFilter<"RolePermission"> | boolean
    canAccessSupplyInput?: BoolFilter<"RolePermission"> | boolean
    canAccessSupplyList?: BoolFilter<"RolePermission"> | boolean
    canAccessMasterGardens?: BoolFilter<"RolePermission"> | boolean
    canAccessMasterFertilizers?: BoolFilter<"RolePermission"> | boolean
    canAccessMasterSuppliers?: BoolFilter<"RolePermission"> | boolean
    canAccessSupplierInformation?: BoolFilter<"RolePermission"> | boolean
    canAccessUserManagement?: BoolFilter<"RolePermission"> | boolean
    canAccessAdminDelivery?: BoolFilter<"RolePermission"> | boolean
    canAccessKraniHome?: BoolFilter<"RolePermission"> | boolean
    canAccessDeliveryWorkspace?: BoolFilter<"RolePermission"> | boolean
    createdAt?: DateTimeFilter<"RolePermission"> | Date | string
    updatedAt?: DateTimeFilter<"RolePermission"> | Date | string
  }

  export type RolePermissionOrderByWithRelationInput = {
    role?: SortOrder
    gardenViewScope?: SortOrder
    gardenEditScope?: SortOrder
    gardenDeleteScope?: SortOrder
    canAccessAdminHome?: SortOrder
    canAccessSupplyInput?: SortOrder
    canAccessSupplyList?: SortOrder
    canAccessMasterGardens?: SortOrder
    canAccessMasterFertilizers?: SortOrder
    canAccessMasterSuppliers?: SortOrder
    canAccessSupplierInformation?: SortOrder
    canAccessUserManagement?: SortOrder
    canAccessAdminDelivery?: SortOrder
    canAccessKraniHome?: SortOrder
    canAccessDeliveryWorkspace?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RolePermissionWhereUniqueInput = Prisma.AtLeast<{
    role?: $Enums.UserRole
    AND?: RolePermissionWhereInput | RolePermissionWhereInput[]
    OR?: RolePermissionWhereInput[]
    NOT?: RolePermissionWhereInput | RolePermissionWhereInput[]
    gardenViewScope?: EnumGardenAccessScopeFilter<"RolePermission"> | $Enums.GardenAccessScope
    gardenEditScope?: EnumGardenAccessScopeFilter<"RolePermission"> | $Enums.GardenAccessScope
    gardenDeleteScope?: EnumGardenAccessScopeFilter<"RolePermission"> | $Enums.GardenAccessScope
    canAccessAdminHome?: BoolFilter<"RolePermission"> | boolean
    canAccessSupplyInput?: BoolFilter<"RolePermission"> | boolean
    canAccessSupplyList?: BoolFilter<"RolePermission"> | boolean
    canAccessMasterGardens?: BoolFilter<"RolePermission"> | boolean
    canAccessMasterFertilizers?: BoolFilter<"RolePermission"> | boolean
    canAccessMasterSuppliers?: BoolFilter<"RolePermission"> | boolean
    canAccessSupplierInformation?: BoolFilter<"RolePermission"> | boolean
    canAccessUserManagement?: BoolFilter<"RolePermission"> | boolean
    canAccessAdminDelivery?: BoolFilter<"RolePermission"> | boolean
    canAccessKraniHome?: BoolFilter<"RolePermission"> | boolean
    canAccessDeliveryWorkspace?: BoolFilter<"RolePermission"> | boolean
    createdAt?: DateTimeFilter<"RolePermission"> | Date | string
    updatedAt?: DateTimeFilter<"RolePermission"> | Date | string
  }, "role">

  export type RolePermissionOrderByWithAggregationInput = {
    role?: SortOrder
    gardenViewScope?: SortOrder
    gardenEditScope?: SortOrder
    gardenDeleteScope?: SortOrder
    canAccessAdminHome?: SortOrder
    canAccessSupplyInput?: SortOrder
    canAccessSupplyList?: SortOrder
    canAccessMasterGardens?: SortOrder
    canAccessMasterFertilizers?: SortOrder
    canAccessMasterSuppliers?: SortOrder
    canAccessSupplierInformation?: SortOrder
    canAccessUserManagement?: SortOrder
    canAccessAdminDelivery?: SortOrder
    canAccessKraniHome?: SortOrder
    canAccessDeliveryWorkspace?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RolePermissionCountOrderByAggregateInput
    _max?: RolePermissionMaxOrderByAggregateInput
    _min?: RolePermissionMinOrderByAggregateInput
  }

  export type RolePermissionScalarWhereWithAggregatesInput = {
    AND?: RolePermissionScalarWhereWithAggregatesInput | RolePermissionScalarWhereWithAggregatesInput[]
    OR?: RolePermissionScalarWhereWithAggregatesInput[]
    NOT?: RolePermissionScalarWhereWithAggregatesInput | RolePermissionScalarWhereWithAggregatesInput[]
    role?: EnumUserRoleWithAggregatesFilter<"RolePermission"> | $Enums.UserRole
    gardenViewScope?: EnumGardenAccessScopeWithAggregatesFilter<"RolePermission"> | $Enums.GardenAccessScope
    gardenEditScope?: EnumGardenAccessScopeWithAggregatesFilter<"RolePermission"> | $Enums.GardenAccessScope
    gardenDeleteScope?: EnumGardenAccessScopeWithAggregatesFilter<"RolePermission"> | $Enums.GardenAccessScope
    canAccessAdminHome?: BoolWithAggregatesFilter<"RolePermission"> | boolean
    canAccessSupplyInput?: BoolWithAggregatesFilter<"RolePermission"> | boolean
    canAccessSupplyList?: BoolWithAggregatesFilter<"RolePermission"> | boolean
    canAccessMasterGardens?: BoolWithAggregatesFilter<"RolePermission"> | boolean
    canAccessMasterFertilizers?: BoolWithAggregatesFilter<"RolePermission"> | boolean
    canAccessMasterSuppliers?: BoolWithAggregatesFilter<"RolePermission"> | boolean
    canAccessSupplierInformation?: BoolWithAggregatesFilter<"RolePermission"> | boolean
    canAccessUserManagement?: BoolWithAggregatesFilter<"RolePermission"> | boolean
    canAccessAdminDelivery?: BoolWithAggregatesFilter<"RolePermission"> | boolean
    canAccessKraniHome?: BoolWithAggregatesFilter<"RolePermission"> | boolean
    canAccessDeliveryWorkspace?: BoolWithAggregatesFilter<"RolePermission"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"RolePermission"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RolePermission"> | Date | string
  }

  export type GardenWhereInput = {
    AND?: GardenWhereInput | GardenWhereInput[]
    OR?: GardenWhereInput[]
    NOT?: GardenWhereInput | GardenWhereInput[]
    id?: StringFilter<"Garden"> | string
    name?: StringFilter<"Garden"> | string
    code?: StringFilter<"Garden"> | string
    address?: StringNullableFilter<"Garden"> | string | null
    isActive?: BoolFilter<"Garden"> | boolean
    createdAt?: DateTimeFilter<"Garden"> | Date | string
    updatedAt?: DateTimeFilter<"Garden"> | Date | string
    supplyOrders?: SupplyOrderListRelationFilter
    assignedUsers?: UserListRelationFilter
  }

  export type GardenOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    address?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    supplyOrders?: SupplyOrderOrderByRelationAggregateInput
    assignedUsers?: UserOrderByRelationAggregateInput
  }

  export type GardenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    code?: string
    AND?: GardenWhereInput | GardenWhereInput[]
    OR?: GardenWhereInput[]
    NOT?: GardenWhereInput | GardenWhereInput[]
    address?: StringNullableFilter<"Garden"> | string | null
    isActive?: BoolFilter<"Garden"> | boolean
    createdAt?: DateTimeFilter<"Garden"> | Date | string
    updatedAt?: DateTimeFilter<"Garden"> | Date | string
    supplyOrders?: SupplyOrderListRelationFilter
    assignedUsers?: UserListRelationFilter
  }, "id" | "name" | "code">

  export type GardenOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    address?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GardenCountOrderByAggregateInput
    _max?: GardenMaxOrderByAggregateInput
    _min?: GardenMinOrderByAggregateInput
  }

  export type GardenScalarWhereWithAggregatesInput = {
    AND?: GardenScalarWhereWithAggregatesInput | GardenScalarWhereWithAggregatesInput[]
    OR?: GardenScalarWhereWithAggregatesInput[]
    NOT?: GardenScalarWhereWithAggregatesInput | GardenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Garden"> | string
    name?: StringWithAggregatesFilter<"Garden"> | string
    code?: StringWithAggregatesFilter<"Garden"> | string
    address?: StringNullableWithAggregatesFilter<"Garden"> | string | null
    isActive?: BoolWithAggregatesFilter<"Garden"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Garden"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Garden"> | Date | string
  }

  export type FertilizerTypeWhereInput = {
    AND?: FertilizerTypeWhereInput | FertilizerTypeWhereInput[]
    OR?: FertilizerTypeWhereInput[]
    NOT?: FertilizerTypeWhereInput | FertilizerTypeWhereInput[]
    id?: StringFilter<"FertilizerType"> | string
    name?: StringFilter<"FertilizerType"> | string
    unit?: StringFilter<"FertilizerType"> | string
    isActive?: BoolFilter<"FertilizerType"> | boolean
    createdAt?: DateTimeFilter<"FertilizerType"> | Date | string
    updatedAt?: DateTimeFilter<"FertilizerType"> | Date | string
    supplyOrders?: SupplyOrderListRelationFilter
  }

  export type FertilizerTypeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    unit?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    supplyOrders?: SupplyOrderOrderByRelationAggregateInput
  }

  export type FertilizerTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: FertilizerTypeWhereInput | FertilizerTypeWhereInput[]
    OR?: FertilizerTypeWhereInput[]
    NOT?: FertilizerTypeWhereInput | FertilizerTypeWhereInput[]
    unit?: StringFilter<"FertilizerType"> | string
    isActive?: BoolFilter<"FertilizerType"> | boolean
    createdAt?: DateTimeFilter<"FertilizerType"> | Date | string
    updatedAt?: DateTimeFilter<"FertilizerType"> | Date | string
    supplyOrders?: SupplyOrderListRelationFilter
  }, "id" | "name">

  export type FertilizerTypeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    unit?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FertilizerTypeCountOrderByAggregateInput
    _max?: FertilizerTypeMaxOrderByAggregateInput
    _min?: FertilizerTypeMinOrderByAggregateInput
  }

  export type FertilizerTypeScalarWhereWithAggregatesInput = {
    AND?: FertilizerTypeScalarWhereWithAggregatesInput | FertilizerTypeScalarWhereWithAggregatesInput[]
    OR?: FertilizerTypeScalarWhereWithAggregatesInput[]
    NOT?: FertilizerTypeScalarWhereWithAggregatesInput | FertilizerTypeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FertilizerType"> | string
    name?: StringWithAggregatesFilter<"FertilizerType"> | string
    unit?: StringWithAggregatesFilter<"FertilizerType"> | string
    isActive?: BoolWithAggregatesFilter<"FertilizerType"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"FertilizerType"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FertilizerType"> | Date | string
  }

  export type SupplierWhereInput = {
    AND?: SupplierWhereInput | SupplierWhereInput[]
    OR?: SupplierWhereInput[]
    NOT?: SupplierWhereInput | SupplierWhereInput[]
    id?: StringFilter<"Supplier"> | string
    name?: StringFilter<"Supplier"> | string
    contactName?: StringNullableFilter<"Supplier"> | string | null
    address?: StringNullableFilter<"Supplier"> | string | null
    phone?: StringNullableFilter<"Supplier"> | string | null
    email?: StringNullableFilter<"Supplier"> | string | null
    isActive?: BoolFilter<"Supplier"> | boolean
    createdAt?: DateTimeFilter<"Supplier"> | Date | string
    updatedAt?: DateTimeFilter<"Supplier"> | Date | string
    supplyOrders?: SupplyOrderListRelationFilter
  }

  export type SupplierOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    contactName?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    supplyOrders?: SupplyOrderOrderByRelationAggregateInput
  }

  export type SupplierWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    email?: string
    AND?: SupplierWhereInput | SupplierWhereInput[]
    OR?: SupplierWhereInput[]
    NOT?: SupplierWhereInput | SupplierWhereInput[]
    contactName?: StringNullableFilter<"Supplier"> | string | null
    address?: StringNullableFilter<"Supplier"> | string | null
    phone?: StringNullableFilter<"Supplier"> | string | null
    isActive?: BoolFilter<"Supplier"> | boolean
    createdAt?: DateTimeFilter<"Supplier"> | Date | string
    updatedAt?: DateTimeFilter<"Supplier"> | Date | string
    supplyOrders?: SupplyOrderListRelationFilter
  }, "id" | "name" | "email">

  export type SupplierOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    contactName?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SupplierCountOrderByAggregateInput
    _max?: SupplierMaxOrderByAggregateInput
    _min?: SupplierMinOrderByAggregateInput
  }

  export type SupplierScalarWhereWithAggregatesInput = {
    AND?: SupplierScalarWhereWithAggregatesInput | SupplierScalarWhereWithAggregatesInput[]
    OR?: SupplierScalarWhereWithAggregatesInput[]
    NOT?: SupplierScalarWhereWithAggregatesInput | SupplierScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Supplier"> | string
    name?: StringWithAggregatesFilter<"Supplier"> | string
    contactName?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    address?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    email?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    isActive?: BoolWithAggregatesFilter<"Supplier"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Supplier"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Supplier"> | Date | string
  }

  export type SupplyOrderWhereInput = {
    AND?: SupplyOrderWhereInput | SupplyOrderWhereInput[]
    OR?: SupplyOrderWhereInput[]
    NOT?: SupplyOrderWhereInput | SupplyOrderWhereInput[]
    id?: StringFilter<"SupplyOrder"> | string
    gardenId?: StringFilter<"SupplyOrder"> | string
    fertilizerTypeId?: StringFilter<"SupplyOrder"> | string
    supplierId?: StringFilter<"SupplyOrder"> | string
    sp2bjNumber?: StringFilter<"SupplyOrder"> | string
    contractStartDate?: DateTimeFilter<"SupplyOrder"> | Date | string
    contractEndDate?: DateTimeFilter<"SupplyOrder"> | Date | string
    quantityOrdered?: IntFilter<"SupplyOrder"> | number
    budgetType?: EnumSupplyBudgetTypeFilter<"SupplyOrder"> | $Enums.SupplyBudgetType
    unitPrice?: DecimalFilter<"SupplyOrder"> | Decimal | DecimalJsLike | number | string
    freightCost?: DecimalFilter<"SupplyOrder"> | Decimal | DecimalJsLike | number | string
    totalCost?: DecimalFilter<"SupplyOrder"> | Decimal | DecimalJsLike | number | string
    ppnAmount?: DecimalFilter<"SupplyOrder"> | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFilter<"SupplyOrder"> | Decimal | DecimalJsLike | number | string
    createdById?: StringFilter<"SupplyOrder"> | string
    createdAt?: DateTimeFilter<"SupplyOrder"> | Date | string
    updatedAt?: DateTimeFilter<"SupplyOrder"> | Date | string
    garden?: XOR<GardenScalarRelationFilter, GardenWhereInput>
    fertilizerType?: XOR<FertilizerTypeScalarRelationFilter, FertilizerTypeWhereInput>
    supplier?: XOR<SupplierScalarRelationFilter, SupplierWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    deliveries?: DeliveryReceiptListRelationFilter
  }

  export type SupplyOrderOrderByWithRelationInput = {
    id?: SortOrder
    gardenId?: SortOrder
    fertilizerTypeId?: SortOrder
    supplierId?: SortOrder
    sp2bjNumber?: SortOrder
    contractStartDate?: SortOrder
    contractEndDate?: SortOrder
    quantityOrdered?: SortOrder
    budgetType?: SortOrder
    unitPrice?: SortOrder
    freightCost?: SortOrder
    totalCost?: SortOrder
    ppnAmount?: SortOrder
    grandTotal?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    garden?: GardenOrderByWithRelationInput
    fertilizerType?: FertilizerTypeOrderByWithRelationInput
    supplier?: SupplierOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
    deliveries?: DeliveryReceiptOrderByRelationAggregateInput
  }

  export type SupplyOrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    gardenId_fertilizerTypeId_sp2bjNumber?: SupplyOrderGardenIdFertilizerTypeIdSp2bjNumberCompoundUniqueInput
    AND?: SupplyOrderWhereInput | SupplyOrderWhereInput[]
    OR?: SupplyOrderWhereInput[]
    NOT?: SupplyOrderWhereInput | SupplyOrderWhereInput[]
    gardenId?: StringFilter<"SupplyOrder"> | string
    fertilizerTypeId?: StringFilter<"SupplyOrder"> | string
    supplierId?: StringFilter<"SupplyOrder"> | string
    sp2bjNumber?: StringFilter<"SupplyOrder"> | string
    contractStartDate?: DateTimeFilter<"SupplyOrder"> | Date | string
    contractEndDate?: DateTimeFilter<"SupplyOrder"> | Date | string
    quantityOrdered?: IntFilter<"SupplyOrder"> | number
    budgetType?: EnumSupplyBudgetTypeFilter<"SupplyOrder"> | $Enums.SupplyBudgetType
    unitPrice?: DecimalFilter<"SupplyOrder"> | Decimal | DecimalJsLike | number | string
    freightCost?: DecimalFilter<"SupplyOrder"> | Decimal | DecimalJsLike | number | string
    totalCost?: DecimalFilter<"SupplyOrder"> | Decimal | DecimalJsLike | number | string
    ppnAmount?: DecimalFilter<"SupplyOrder"> | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFilter<"SupplyOrder"> | Decimal | DecimalJsLike | number | string
    createdById?: StringFilter<"SupplyOrder"> | string
    createdAt?: DateTimeFilter<"SupplyOrder"> | Date | string
    updatedAt?: DateTimeFilter<"SupplyOrder"> | Date | string
    garden?: XOR<GardenScalarRelationFilter, GardenWhereInput>
    fertilizerType?: XOR<FertilizerTypeScalarRelationFilter, FertilizerTypeWhereInput>
    supplier?: XOR<SupplierScalarRelationFilter, SupplierWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    deliveries?: DeliveryReceiptListRelationFilter
  }, "id" | "gardenId_fertilizerTypeId_sp2bjNumber">

  export type SupplyOrderOrderByWithAggregationInput = {
    id?: SortOrder
    gardenId?: SortOrder
    fertilizerTypeId?: SortOrder
    supplierId?: SortOrder
    sp2bjNumber?: SortOrder
    contractStartDate?: SortOrder
    contractEndDate?: SortOrder
    quantityOrdered?: SortOrder
    budgetType?: SortOrder
    unitPrice?: SortOrder
    freightCost?: SortOrder
    totalCost?: SortOrder
    ppnAmount?: SortOrder
    grandTotal?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SupplyOrderCountOrderByAggregateInput
    _avg?: SupplyOrderAvgOrderByAggregateInput
    _max?: SupplyOrderMaxOrderByAggregateInput
    _min?: SupplyOrderMinOrderByAggregateInput
    _sum?: SupplyOrderSumOrderByAggregateInput
  }

  export type SupplyOrderScalarWhereWithAggregatesInput = {
    AND?: SupplyOrderScalarWhereWithAggregatesInput | SupplyOrderScalarWhereWithAggregatesInput[]
    OR?: SupplyOrderScalarWhereWithAggregatesInput[]
    NOT?: SupplyOrderScalarWhereWithAggregatesInput | SupplyOrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SupplyOrder"> | string
    gardenId?: StringWithAggregatesFilter<"SupplyOrder"> | string
    fertilizerTypeId?: StringWithAggregatesFilter<"SupplyOrder"> | string
    supplierId?: StringWithAggregatesFilter<"SupplyOrder"> | string
    sp2bjNumber?: StringWithAggregatesFilter<"SupplyOrder"> | string
    contractStartDate?: DateTimeWithAggregatesFilter<"SupplyOrder"> | Date | string
    contractEndDate?: DateTimeWithAggregatesFilter<"SupplyOrder"> | Date | string
    quantityOrdered?: IntWithAggregatesFilter<"SupplyOrder"> | number
    budgetType?: EnumSupplyBudgetTypeWithAggregatesFilter<"SupplyOrder"> | $Enums.SupplyBudgetType
    unitPrice?: DecimalWithAggregatesFilter<"SupplyOrder"> | Decimal | DecimalJsLike | number | string
    freightCost?: DecimalWithAggregatesFilter<"SupplyOrder"> | Decimal | DecimalJsLike | number | string
    totalCost?: DecimalWithAggregatesFilter<"SupplyOrder"> | Decimal | DecimalJsLike | number | string
    ppnAmount?: DecimalWithAggregatesFilter<"SupplyOrder"> | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalWithAggregatesFilter<"SupplyOrder"> | Decimal | DecimalJsLike | number | string
    createdById?: StringWithAggregatesFilter<"SupplyOrder"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SupplyOrder"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SupplyOrder"> | Date | string
  }

  export type DeliveryReceiptWhereInput = {
    AND?: DeliveryReceiptWhereInput | DeliveryReceiptWhereInput[]
    OR?: DeliveryReceiptWhereInput[]
    NOT?: DeliveryReceiptWhereInput | DeliveryReceiptWhereInput[]
    id?: StringFilter<"DeliveryReceipt"> | string
    supplyOrderId?: StringFilter<"DeliveryReceipt"> | string
    licensePlate?: StringFilter<"DeliveryReceipt"> | string
    receivedDate?: DateTimeFilter<"DeliveryReceipt"> | Date | string
    quantityDelivered?: IntFilter<"DeliveryReceipt"> | number
    sackCount?: IntFilter<"DeliveryReceipt"> | number
    createdById?: StringFilter<"DeliveryReceipt"> | string
    createdAt?: DateTimeFilter<"DeliveryReceipt"> | Date | string
    updatedAt?: DateTimeFilter<"DeliveryReceipt"> | Date | string
    supplyOrder?: XOR<SupplyOrderScalarRelationFilter, SupplyOrderWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type DeliveryReceiptOrderByWithRelationInput = {
    id?: SortOrder
    supplyOrderId?: SortOrder
    licensePlate?: SortOrder
    receivedDate?: SortOrder
    quantityDelivered?: SortOrder
    sackCount?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    supplyOrder?: SupplyOrderOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
  }

  export type DeliveryReceiptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DeliveryReceiptWhereInput | DeliveryReceiptWhereInput[]
    OR?: DeliveryReceiptWhereInput[]
    NOT?: DeliveryReceiptWhereInput | DeliveryReceiptWhereInput[]
    supplyOrderId?: StringFilter<"DeliveryReceipt"> | string
    licensePlate?: StringFilter<"DeliveryReceipt"> | string
    receivedDate?: DateTimeFilter<"DeliveryReceipt"> | Date | string
    quantityDelivered?: IntFilter<"DeliveryReceipt"> | number
    sackCount?: IntFilter<"DeliveryReceipt"> | number
    createdById?: StringFilter<"DeliveryReceipt"> | string
    createdAt?: DateTimeFilter<"DeliveryReceipt"> | Date | string
    updatedAt?: DateTimeFilter<"DeliveryReceipt"> | Date | string
    supplyOrder?: XOR<SupplyOrderScalarRelationFilter, SupplyOrderWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type DeliveryReceiptOrderByWithAggregationInput = {
    id?: SortOrder
    supplyOrderId?: SortOrder
    licensePlate?: SortOrder
    receivedDate?: SortOrder
    quantityDelivered?: SortOrder
    sackCount?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DeliveryReceiptCountOrderByAggregateInput
    _avg?: DeliveryReceiptAvgOrderByAggregateInput
    _max?: DeliveryReceiptMaxOrderByAggregateInput
    _min?: DeliveryReceiptMinOrderByAggregateInput
    _sum?: DeliveryReceiptSumOrderByAggregateInput
  }

  export type DeliveryReceiptScalarWhereWithAggregatesInput = {
    AND?: DeliveryReceiptScalarWhereWithAggregatesInput | DeliveryReceiptScalarWhereWithAggregatesInput[]
    OR?: DeliveryReceiptScalarWhereWithAggregatesInput[]
    NOT?: DeliveryReceiptScalarWhereWithAggregatesInput | DeliveryReceiptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DeliveryReceipt"> | string
    supplyOrderId?: StringWithAggregatesFilter<"DeliveryReceipt"> | string
    licensePlate?: StringWithAggregatesFilter<"DeliveryReceipt"> | string
    receivedDate?: DateTimeWithAggregatesFilter<"DeliveryReceipt"> | Date | string
    quantityDelivered?: IntWithAggregatesFilter<"DeliveryReceipt"> | number
    sackCount?: IntWithAggregatesFilter<"DeliveryReceipt"> | number
    createdById?: StringWithAggregatesFilter<"DeliveryReceipt"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DeliveryReceipt"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DeliveryReceipt"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedGarden?: GardenCreateNestedOneWithoutAssignedUsersInput
    createdSupply?: SupplyOrderCreateNestedManyWithoutCreatedByInput
    createdDeliveries?: DeliveryReceiptCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    isActive?: boolean
    assignedGardenId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdSupply?: SupplyOrderUncheckedCreateNestedManyWithoutCreatedByInput
    createdDeliveries?: DeliveryReceiptUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedGarden?: GardenUpdateOneWithoutAssignedUsersNestedInput
    createdSupply?: SupplyOrderUpdateManyWithoutCreatedByNestedInput
    createdDeliveries?: DeliveryReceiptUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    assignedGardenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdSupply?: SupplyOrderUncheckedUpdateManyWithoutCreatedByNestedInput
    createdDeliveries?: DeliveryReceiptUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    isActive?: boolean
    assignedGardenId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    assignedGardenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissionCreateInput = {
    role: $Enums.UserRole
    gardenViewScope?: $Enums.GardenAccessScope
    gardenEditScope?: $Enums.GardenAccessScope
    gardenDeleteScope?: $Enums.GardenAccessScope
    canAccessAdminHome?: boolean
    canAccessSupplyInput?: boolean
    canAccessSupplyList?: boolean
    canAccessMasterGardens?: boolean
    canAccessMasterFertilizers?: boolean
    canAccessMasterSuppliers?: boolean
    canAccessSupplierInformation?: boolean
    canAccessUserManagement?: boolean
    canAccessAdminDelivery?: boolean
    canAccessKraniHome?: boolean
    canAccessDeliveryWorkspace?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RolePermissionUncheckedCreateInput = {
    role: $Enums.UserRole
    gardenViewScope?: $Enums.GardenAccessScope
    gardenEditScope?: $Enums.GardenAccessScope
    gardenDeleteScope?: $Enums.GardenAccessScope
    canAccessAdminHome?: boolean
    canAccessSupplyInput?: boolean
    canAccessSupplyList?: boolean
    canAccessMasterGardens?: boolean
    canAccessMasterFertilizers?: boolean
    canAccessMasterSuppliers?: boolean
    canAccessSupplierInformation?: boolean
    canAccessUserManagement?: boolean
    canAccessAdminDelivery?: boolean
    canAccessKraniHome?: boolean
    canAccessDeliveryWorkspace?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RolePermissionUpdateInput = {
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    gardenViewScope?: EnumGardenAccessScopeFieldUpdateOperationsInput | $Enums.GardenAccessScope
    gardenEditScope?: EnumGardenAccessScopeFieldUpdateOperationsInput | $Enums.GardenAccessScope
    gardenDeleteScope?: EnumGardenAccessScopeFieldUpdateOperationsInput | $Enums.GardenAccessScope
    canAccessAdminHome?: BoolFieldUpdateOperationsInput | boolean
    canAccessSupplyInput?: BoolFieldUpdateOperationsInput | boolean
    canAccessSupplyList?: BoolFieldUpdateOperationsInput | boolean
    canAccessMasterGardens?: BoolFieldUpdateOperationsInput | boolean
    canAccessMasterFertilizers?: BoolFieldUpdateOperationsInput | boolean
    canAccessMasterSuppliers?: BoolFieldUpdateOperationsInput | boolean
    canAccessSupplierInformation?: BoolFieldUpdateOperationsInput | boolean
    canAccessUserManagement?: BoolFieldUpdateOperationsInput | boolean
    canAccessAdminDelivery?: BoolFieldUpdateOperationsInput | boolean
    canAccessKraniHome?: BoolFieldUpdateOperationsInput | boolean
    canAccessDeliveryWorkspace?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissionUncheckedUpdateInput = {
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    gardenViewScope?: EnumGardenAccessScopeFieldUpdateOperationsInput | $Enums.GardenAccessScope
    gardenEditScope?: EnumGardenAccessScopeFieldUpdateOperationsInput | $Enums.GardenAccessScope
    gardenDeleteScope?: EnumGardenAccessScopeFieldUpdateOperationsInput | $Enums.GardenAccessScope
    canAccessAdminHome?: BoolFieldUpdateOperationsInput | boolean
    canAccessSupplyInput?: BoolFieldUpdateOperationsInput | boolean
    canAccessSupplyList?: BoolFieldUpdateOperationsInput | boolean
    canAccessMasterGardens?: BoolFieldUpdateOperationsInput | boolean
    canAccessMasterFertilizers?: BoolFieldUpdateOperationsInput | boolean
    canAccessMasterSuppliers?: BoolFieldUpdateOperationsInput | boolean
    canAccessSupplierInformation?: BoolFieldUpdateOperationsInput | boolean
    canAccessUserManagement?: BoolFieldUpdateOperationsInput | boolean
    canAccessAdminDelivery?: BoolFieldUpdateOperationsInput | boolean
    canAccessKraniHome?: BoolFieldUpdateOperationsInput | boolean
    canAccessDeliveryWorkspace?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissionCreateManyInput = {
    role: $Enums.UserRole
    gardenViewScope?: $Enums.GardenAccessScope
    gardenEditScope?: $Enums.GardenAccessScope
    gardenDeleteScope?: $Enums.GardenAccessScope
    canAccessAdminHome?: boolean
    canAccessSupplyInput?: boolean
    canAccessSupplyList?: boolean
    canAccessMasterGardens?: boolean
    canAccessMasterFertilizers?: boolean
    canAccessMasterSuppliers?: boolean
    canAccessSupplierInformation?: boolean
    canAccessUserManagement?: boolean
    canAccessAdminDelivery?: boolean
    canAccessKraniHome?: boolean
    canAccessDeliveryWorkspace?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RolePermissionUpdateManyMutationInput = {
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    gardenViewScope?: EnumGardenAccessScopeFieldUpdateOperationsInput | $Enums.GardenAccessScope
    gardenEditScope?: EnumGardenAccessScopeFieldUpdateOperationsInput | $Enums.GardenAccessScope
    gardenDeleteScope?: EnumGardenAccessScopeFieldUpdateOperationsInput | $Enums.GardenAccessScope
    canAccessAdminHome?: BoolFieldUpdateOperationsInput | boolean
    canAccessSupplyInput?: BoolFieldUpdateOperationsInput | boolean
    canAccessSupplyList?: BoolFieldUpdateOperationsInput | boolean
    canAccessMasterGardens?: BoolFieldUpdateOperationsInput | boolean
    canAccessMasterFertilizers?: BoolFieldUpdateOperationsInput | boolean
    canAccessMasterSuppliers?: BoolFieldUpdateOperationsInput | boolean
    canAccessSupplierInformation?: BoolFieldUpdateOperationsInput | boolean
    canAccessUserManagement?: BoolFieldUpdateOperationsInput | boolean
    canAccessAdminDelivery?: BoolFieldUpdateOperationsInput | boolean
    canAccessKraniHome?: BoolFieldUpdateOperationsInput | boolean
    canAccessDeliveryWorkspace?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissionUncheckedUpdateManyInput = {
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    gardenViewScope?: EnumGardenAccessScopeFieldUpdateOperationsInput | $Enums.GardenAccessScope
    gardenEditScope?: EnumGardenAccessScopeFieldUpdateOperationsInput | $Enums.GardenAccessScope
    gardenDeleteScope?: EnumGardenAccessScopeFieldUpdateOperationsInput | $Enums.GardenAccessScope
    canAccessAdminHome?: BoolFieldUpdateOperationsInput | boolean
    canAccessSupplyInput?: BoolFieldUpdateOperationsInput | boolean
    canAccessSupplyList?: BoolFieldUpdateOperationsInput | boolean
    canAccessMasterGardens?: BoolFieldUpdateOperationsInput | boolean
    canAccessMasterFertilizers?: BoolFieldUpdateOperationsInput | boolean
    canAccessMasterSuppliers?: BoolFieldUpdateOperationsInput | boolean
    canAccessSupplierInformation?: BoolFieldUpdateOperationsInput | boolean
    canAccessUserManagement?: BoolFieldUpdateOperationsInput | boolean
    canAccessAdminDelivery?: BoolFieldUpdateOperationsInput | boolean
    canAccessKraniHome?: BoolFieldUpdateOperationsInput | boolean
    canAccessDeliveryWorkspace?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GardenCreateInput = {
    id?: string
    name: string
    code: string
    address?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    supplyOrders?: SupplyOrderCreateNestedManyWithoutGardenInput
    assignedUsers?: UserCreateNestedManyWithoutAssignedGardenInput
  }

  export type GardenUncheckedCreateInput = {
    id?: string
    name: string
    code: string
    address?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    supplyOrders?: SupplyOrderUncheckedCreateNestedManyWithoutGardenInput
    assignedUsers?: UserUncheckedCreateNestedManyWithoutAssignedGardenInput
  }

  export type GardenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplyOrders?: SupplyOrderUpdateManyWithoutGardenNestedInput
    assignedUsers?: UserUpdateManyWithoutAssignedGardenNestedInput
  }

  export type GardenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplyOrders?: SupplyOrderUncheckedUpdateManyWithoutGardenNestedInput
    assignedUsers?: UserUncheckedUpdateManyWithoutAssignedGardenNestedInput
  }

  export type GardenCreateManyInput = {
    id?: string
    name: string
    code: string
    address?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GardenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GardenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FertilizerTypeCreateInput = {
    id?: string
    name: string
    unit?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    supplyOrders?: SupplyOrderCreateNestedManyWithoutFertilizerTypeInput
  }

  export type FertilizerTypeUncheckedCreateInput = {
    id?: string
    name: string
    unit?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    supplyOrders?: SupplyOrderUncheckedCreateNestedManyWithoutFertilizerTypeInput
  }

  export type FertilizerTypeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplyOrders?: SupplyOrderUpdateManyWithoutFertilizerTypeNestedInput
  }

  export type FertilizerTypeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplyOrders?: SupplyOrderUncheckedUpdateManyWithoutFertilizerTypeNestedInput
  }

  export type FertilizerTypeCreateManyInput = {
    id?: string
    name: string
    unit?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FertilizerTypeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FertilizerTypeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierCreateInput = {
    id?: string
    name: string
    contactName?: string | null
    address?: string | null
    phone?: string | null
    email?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    supplyOrders?: SupplyOrderCreateNestedManyWithoutSupplierInput
  }

  export type SupplierUncheckedCreateInput = {
    id?: string
    name: string
    contactName?: string | null
    address?: string | null
    phone?: string | null
    email?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    supplyOrders?: SupplyOrderUncheckedCreateNestedManyWithoutSupplierInput
  }

  export type SupplierUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplyOrders?: SupplyOrderUpdateManyWithoutSupplierNestedInput
  }

  export type SupplierUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplyOrders?: SupplyOrderUncheckedUpdateManyWithoutSupplierNestedInput
  }

  export type SupplierCreateManyInput = {
    id?: string
    name: string
    contactName?: string | null
    address?: string | null
    phone?: string | null
    email?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplyOrderCreateInput = {
    id?: string
    sp2bjNumber: string
    contractStartDate: Date | string
    contractEndDate: Date | string
    quantityOrdered: number
    budgetType: $Enums.SupplyBudgetType
    unitPrice: Decimal | DecimalJsLike | number | string
    freightCost: Decimal | DecimalJsLike | number | string
    totalCost: Decimal | DecimalJsLike | number | string
    ppnAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    garden: GardenCreateNestedOneWithoutSupplyOrdersInput
    fertilizerType: FertilizerTypeCreateNestedOneWithoutSupplyOrdersInput
    supplier: SupplierCreateNestedOneWithoutSupplyOrdersInput
    createdBy: UserCreateNestedOneWithoutCreatedSupplyInput
    deliveries?: DeliveryReceiptCreateNestedManyWithoutSupplyOrderInput
  }

  export type SupplyOrderUncheckedCreateInput = {
    id?: string
    gardenId: string
    fertilizerTypeId: string
    supplierId: string
    sp2bjNumber: string
    contractStartDate: Date | string
    contractEndDate: Date | string
    quantityOrdered: number
    budgetType: $Enums.SupplyBudgetType
    unitPrice: Decimal | DecimalJsLike | number | string
    freightCost: Decimal | DecimalJsLike | number | string
    totalCost: Decimal | DecimalJsLike | number | string
    ppnAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveries?: DeliveryReceiptUncheckedCreateNestedManyWithoutSupplyOrderInput
  }

  export type SupplyOrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sp2bjNumber?: StringFieldUpdateOperationsInput | string
    contractStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityOrdered?: IntFieldUpdateOperationsInput | number
    budgetType?: EnumSupplyBudgetTypeFieldUpdateOperationsInput | $Enums.SupplyBudgetType
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    freightCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ppnAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    garden?: GardenUpdateOneRequiredWithoutSupplyOrdersNestedInput
    fertilizerType?: FertilizerTypeUpdateOneRequiredWithoutSupplyOrdersNestedInput
    supplier?: SupplierUpdateOneRequiredWithoutSupplyOrdersNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedSupplyNestedInput
    deliveries?: DeliveryReceiptUpdateManyWithoutSupplyOrderNestedInput
  }

  export type SupplyOrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gardenId?: StringFieldUpdateOperationsInput | string
    fertilizerTypeId?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    sp2bjNumber?: StringFieldUpdateOperationsInput | string
    contractStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityOrdered?: IntFieldUpdateOperationsInput | number
    budgetType?: EnumSupplyBudgetTypeFieldUpdateOperationsInput | $Enums.SupplyBudgetType
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    freightCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ppnAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: DeliveryReceiptUncheckedUpdateManyWithoutSupplyOrderNestedInput
  }

  export type SupplyOrderCreateManyInput = {
    id?: string
    gardenId: string
    fertilizerTypeId: string
    supplierId: string
    sp2bjNumber: string
    contractStartDate: Date | string
    contractEndDate: Date | string
    quantityOrdered: number
    budgetType: $Enums.SupplyBudgetType
    unitPrice: Decimal | DecimalJsLike | number | string
    freightCost: Decimal | DecimalJsLike | number | string
    totalCost: Decimal | DecimalJsLike | number | string
    ppnAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplyOrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sp2bjNumber?: StringFieldUpdateOperationsInput | string
    contractStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityOrdered?: IntFieldUpdateOperationsInput | number
    budgetType?: EnumSupplyBudgetTypeFieldUpdateOperationsInput | $Enums.SupplyBudgetType
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    freightCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ppnAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplyOrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    gardenId?: StringFieldUpdateOperationsInput | string
    fertilizerTypeId?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    sp2bjNumber?: StringFieldUpdateOperationsInput | string
    contractStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityOrdered?: IntFieldUpdateOperationsInput | number
    budgetType?: EnumSupplyBudgetTypeFieldUpdateOperationsInput | $Enums.SupplyBudgetType
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    freightCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ppnAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryReceiptCreateInput = {
    id?: string
    licensePlate: string
    receivedDate: Date | string
    quantityDelivered: number
    sackCount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    supplyOrder: SupplyOrderCreateNestedOneWithoutDeliveriesInput
    createdBy: UserCreateNestedOneWithoutCreatedDeliveriesInput
  }

  export type DeliveryReceiptUncheckedCreateInput = {
    id?: string
    supplyOrderId: string
    licensePlate: string
    receivedDate: Date | string
    quantityDelivered: number
    sackCount: number
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryReceiptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    receivedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityDelivered?: IntFieldUpdateOperationsInput | number
    sackCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplyOrder?: SupplyOrderUpdateOneRequiredWithoutDeliveriesNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedDeliveriesNestedInput
  }

  export type DeliveryReceiptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    supplyOrderId?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    receivedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityDelivered?: IntFieldUpdateOperationsInput | number
    sackCount?: IntFieldUpdateOperationsInput | number
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryReceiptCreateManyInput = {
    id?: string
    supplyOrderId: string
    licensePlate: string
    receivedDate: Date | string
    quantityDelivered: number
    sackCount: number
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryReceiptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    receivedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityDelivered?: IntFieldUpdateOperationsInput | number
    sackCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryReceiptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    supplyOrderId?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    receivedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityDelivered?: IntFieldUpdateOperationsInput | number
    sackCount?: IntFieldUpdateOperationsInput | number
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type GardenNullableScalarRelationFilter = {
    is?: GardenWhereInput | null
    isNot?: GardenWhereInput | null
  }

  export type SupplyOrderListRelationFilter = {
    every?: SupplyOrderWhereInput
    some?: SupplyOrderWhereInput
    none?: SupplyOrderWhereInput
  }

  export type DeliveryReceiptListRelationFilter = {
    every?: DeliveryReceiptWhereInput
    some?: DeliveryReceiptWhereInput
    none?: DeliveryReceiptWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SupplyOrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DeliveryReceiptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    assignedGardenId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    assignedGardenId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    assignedGardenId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumGardenAccessScopeFilter<$PrismaModel = never> = {
    equals?: $Enums.GardenAccessScope | EnumGardenAccessScopeFieldRefInput<$PrismaModel>
    in?: $Enums.GardenAccessScope[] | ListEnumGardenAccessScopeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GardenAccessScope[] | ListEnumGardenAccessScopeFieldRefInput<$PrismaModel>
    not?: NestedEnumGardenAccessScopeFilter<$PrismaModel> | $Enums.GardenAccessScope
  }

  export type RolePermissionCountOrderByAggregateInput = {
    role?: SortOrder
    gardenViewScope?: SortOrder
    gardenEditScope?: SortOrder
    gardenDeleteScope?: SortOrder
    canAccessAdminHome?: SortOrder
    canAccessSupplyInput?: SortOrder
    canAccessSupplyList?: SortOrder
    canAccessMasterGardens?: SortOrder
    canAccessMasterFertilizers?: SortOrder
    canAccessMasterSuppliers?: SortOrder
    canAccessSupplierInformation?: SortOrder
    canAccessUserManagement?: SortOrder
    canAccessAdminDelivery?: SortOrder
    canAccessKraniHome?: SortOrder
    canAccessDeliveryWorkspace?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RolePermissionMaxOrderByAggregateInput = {
    role?: SortOrder
    gardenViewScope?: SortOrder
    gardenEditScope?: SortOrder
    gardenDeleteScope?: SortOrder
    canAccessAdminHome?: SortOrder
    canAccessSupplyInput?: SortOrder
    canAccessSupplyList?: SortOrder
    canAccessMasterGardens?: SortOrder
    canAccessMasterFertilizers?: SortOrder
    canAccessMasterSuppliers?: SortOrder
    canAccessSupplierInformation?: SortOrder
    canAccessUserManagement?: SortOrder
    canAccessAdminDelivery?: SortOrder
    canAccessKraniHome?: SortOrder
    canAccessDeliveryWorkspace?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RolePermissionMinOrderByAggregateInput = {
    role?: SortOrder
    gardenViewScope?: SortOrder
    gardenEditScope?: SortOrder
    gardenDeleteScope?: SortOrder
    canAccessAdminHome?: SortOrder
    canAccessSupplyInput?: SortOrder
    canAccessSupplyList?: SortOrder
    canAccessMasterGardens?: SortOrder
    canAccessMasterFertilizers?: SortOrder
    canAccessMasterSuppliers?: SortOrder
    canAccessSupplierInformation?: SortOrder
    canAccessUserManagement?: SortOrder
    canAccessAdminDelivery?: SortOrder
    canAccessKraniHome?: SortOrder
    canAccessDeliveryWorkspace?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumGardenAccessScopeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GardenAccessScope | EnumGardenAccessScopeFieldRefInput<$PrismaModel>
    in?: $Enums.GardenAccessScope[] | ListEnumGardenAccessScopeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GardenAccessScope[] | ListEnumGardenAccessScopeFieldRefInput<$PrismaModel>
    not?: NestedEnumGardenAccessScopeWithAggregatesFilter<$PrismaModel> | $Enums.GardenAccessScope
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGardenAccessScopeFilter<$PrismaModel>
    _max?: NestedEnumGardenAccessScopeFilter<$PrismaModel>
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GardenCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    address?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GardenMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    address?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GardenMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    address?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FertilizerTypeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    unit?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FertilizerTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    unit?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FertilizerTypeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    unit?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplierCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contactName?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplierMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contactName?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplierMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contactName?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumSupplyBudgetTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SupplyBudgetType | EnumSupplyBudgetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SupplyBudgetType[] | ListEnumSupplyBudgetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SupplyBudgetType[] | ListEnumSupplyBudgetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSupplyBudgetTypeFilter<$PrismaModel> | $Enums.SupplyBudgetType
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type GardenScalarRelationFilter = {
    is?: GardenWhereInput
    isNot?: GardenWhereInput
  }

  export type FertilizerTypeScalarRelationFilter = {
    is?: FertilizerTypeWhereInput
    isNot?: FertilizerTypeWhereInput
  }

  export type SupplierScalarRelationFilter = {
    is?: SupplierWhereInput
    isNot?: SupplierWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SupplyOrderGardenIdFertilizerTypeIdSp2bjNumberCompoundUniqueInput = {
    gardenId: string
    fertilizerTypeId: string
    sp2bjNumber: string
  }

  export type SupplyOrderCountOrderByAggregateInput = {
    id?: SortOrder
    gardenId?: SortOrder
    fertilizerTypeId?: SortOrder
    supplierId?: SortOrder
    sp2bjNumber?: SortOrder
    contractStartDate?: SortOrder
    contractEndDate?: SortOrder
    quantityOrdered?: SortOrder
    budgetType?: SortOrder
    unitPrice?: SortOrder
    freightCost?: SortOrder
    totalCost?: SortOrder
    ppnAmount?: SortOrder
    grandTotal?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplyOrderAvgOrderByAggregateInput = {
    quantityOrdered?: SortOrder
    unitPrice?: SortOrder
    freightCost?: SortOrder
    totalCost?: SortOrder
    ppnAmount?: SortOrder
    grandTotal?: SortOrder
  }

  export type SupplyOrderMaxOrderByAggregateInput = {
    id?: SortOrder
    gardenId?: SortOrder
    fertilizerTypeId?: SortOrder
    supplierId?: SortOrder
    sp2bjNumber?: SortOrder
    contractStartDate?: SortOrder
    contractEndDate?: SortOrder
    quantityOrdered?: SortOrder
    budgetType?: SortOrder
    unitPrice?: SortOrder
    freightCost?: SortOrder
    totalCost?: SortOrder
    ppnAmount?: SortOrder
    grandTotal?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplyOrderMinOrderByAggregateInput = {
    id?: SortOrder
    gardenId?: SortOrder
    fertilizerTypeId?: SortOrder
    supplierId?: SortOrder
    sp2bjNumber?: SortOrder
    contractStartDate?: SortOrder
    contractEndDate?: SortOrder
    quantityOrdered?: SortOrder
    budgetType?: SortOrder
    unitPrice?: SortOrder
    freightCost?: SortOrder
    totalCost?: SortOrder
    ppnAmount?: SortOrder
    grandTotal?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplyOrderSumOrderByAggregateInput = {
    quantityOrdered?: SortOrder
    unitPrice?: SortOrder
    freightCost?: SortOrder
    totalCost?: SortOrder
    ppnAmount?: SortOrder
    grandTotal?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumSupplyBudgetTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SupplyBudgetType | EnumSupplyBudgetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SupplyBudgetType[] | ListEnumSupplyBudgetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SupplyBudgetType[] | ListEnumSupplyBudgetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSupplyBudgetTypeWithAggregatesFilter<$PrismaModel> | $Enums.SupplyBudgetType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSupplyBudgetTypeFilter<$PrismaModel>
    _max?: NestedEnumSupplyBudgetTypeFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type SupplyOrderScalarRelationFilter = {
    is?: SupplyOrderWhereInput
    isNot?: SupplyOrderWhereInput
  }

  export type DeliveryReceiptCountOrderByAggregateInput = {
    id?: SortOrder
    supplyOrderId?: SortOrder
    licensePlate?: SortOrder
    receivedDate?: SortOrder
    quantityDelivered?: SortOrder
    sackCount?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliveryReceiptAvgOrderByAggregateInput = {
    quantityDelivered?: SortOrder
    sackCount?: SortOrder
  }

  export type DeliveryReceiptMaxOrderByAggregateInput = {
    id?: SortOrder
    supplyOrderId?: SortOrder
    licensePlate?: SortOrder
    receivedDate?: SortOrder
    quantityDelivered?: SortOrder
    sackCount?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliveryReceiptMinOrderByAggregateInput = {
    id?: SortOrder
    supplyOrderId?: SortOrder
    licensePlate?: SortOrder
    receivedDate?: SortOrder
    quantityDelivered?: SortOrder
    sackCount?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliveryReceiptSumOrderByAggregateInput = {
    quantityDelivered?: SortOrder
    sackCount?: SortOrder
  }

  export type GardenCreateNestedOneWithoutAssignedUsersInput = {
    create?: XOR<GardenCreateWithoutAssignedUsersInput, GardenUncheckedCreateWithoutAssignedUsersInput>
    connectOrCreate?: GardenCreateOrConnectWithoutAssignedUsersInput
    connect?: GardenWhereUniqueInput
  }

  export type SupplyOrderCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<SupplyOrderCreateWithoutCreatedByInput, SupplyOrderUncheckedCreateWithoutCreatedByInput> | SupplyOrderCreateWithoutCreatedByInput[] | SupplyOrderUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: SupplyOrderCreateOrConnectWithoutCreatedByInput | SupplyOrderCreateOrConnectWithoutCreatedByInput[]
    createMany?: SupplyOrderCreateManyCreatedByInputEnvelope
    connect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
  }

  export type DeliveryReceiptCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<DeliveryReceiptCreateWithoutCreatedByInput, DeliveryReceiptUncheckedCreateWithoutCreatedByInput> | DeliveryReceiptCreateWithoutCreatedByInput[] | DeliveryReceiptUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: DeliveryReceiptCreateOrConnectWithoutCreatedByInput | DeliveryReceiptCreateOrConnectWithoutCreatedByInput[]
    createMany?: DeliveryReceiptCreateManyCreatedByInputEnvelope
    connect?: DeliveryReceiptWhereUniqueInput | DeliveryReceiptWhereUniqueInput[]
  }

  export type SupplyOrderUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<SupplyOrderCreateWithoutCreatedByInput, SupplyOrderUncheckedCreateWithoutCreatedByInput> | SupplyOrderCreateWithoutCreatedByInput[] | SupplyOrderUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: SupplyOrderCreateOrConnectWithoutCreatedByInput | SupplyOrderCreateOrConnectWithoutCreatedByInput[]
    createMany?: SupplyOrderCreateManyCreatedByInputEnvelope
    connect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
  }

  export type DeliveryReceiptUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<DeliveryReceiptCreateWithoutCreatedByInput, DeliveryReceiptUncheckedCreateWithoutCreatedByInput> | DeliveryReceiptCreateWithoutCreatedByInput[] | DeliveryReceiptUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: DeliveryReceiptCreateOrConnectWithoutCreatedByInput | DeliveryReceiptCreateOrConnectWithoutCreatedByInput[]
    createMany?: DeliveryReceiptCreateManyCreatedByInputEnvelope
    connect?: DeliveryReceiptWhereUniqueInput | DeliveryReceiptWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type GardenUpdateOneWithoutAssignedUsersNestedInput = {
    create?: XOR<GardenCreateWithoutAssignedUsersInput, GardenUncheckedCreateWithoutAssignedUsersInput>
    connectOrCreate?: GardenCreateOrConnectWithoutAssignedUsersInput
    upsert?: GardenUpsertWithoutAssignedUsersInput
    disconnect?: GardenWhereInput | boolean
    delete?: GardenWhereInput | boolean
    connect?: GardenWhereUniqueInput
    update?: XOR<XOR<GardenUpdateToOneWithWhereWithoutAssignedUsersInput, GardenUpdateWithoutAssignedUsersInput>, GardenUncheckedUpdateWithoutAssignedUsersInput>
  }

  export type SupplyOrderUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<SupplyOrderCreateWithoutCreatedByInput, SupplyOrderUncheckedCreateWithoutCreatedByInput> | SupplyOrderCreateWithoutCreatedByInput[] | SupplyOrderUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: SupplyOrderCreateOrConnectWithoutCreatedByInput | SupplyOrderCreateOrConnectWithoutCreatedByInput[]
    upsert?: SupplyOrderUpsertWithWhereUniqueWithoutCreatedByInput | SupplyOrderUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: SupplyOrderCreateManyCreatedByInputEnvelope
    set?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    disconnect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    delete?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    connect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    update?: SupplyOrderUpdateWithWhereUniqueWithoutCreatedByInput | SupplyOrderUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: SupplyOrderUpdateManyWithWhereWithoutCreatedByInput | SupplyOrderUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: SupplyOrderScalarWhereInput | SupplyOrderScalarWhereInput[]
  }

  export type DeliveryReceiptUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<DeliveryReceiptCreateWithoutCreatedByInput, DeliveryReceiptUncheckedCreateWithoutCreatedByInput> | DeliveryReceiptCreateWithoutCreatedByInput[] | DeliveryReceiptUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: DeliveryReceiptCreateOrConnectWithoutCreatedByInput | DeliveryReceiptCreateOrConnectWithoutCreatedByInput[]
    upsert?: DeliveryReceiptUpsertWithWhereUniqueWithoutCreatedByInput | DeliveryReceiptUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: DeliveryReceiptCreateManyCreatedByInputEnvelope
    set?: DeliveryReceiptWhereUniqueInput | DeliveryReceiptWhereUniqueInput[]
    disconnect?: DeliveryReceiptWhereUniqueInput | DeliveryReceiptWhereUniqueInput[]
    delete?: DeliveryReceiptWhereUniqueInput | DeliveryReceiptWhereUniqueInput[]
    connect?: DeliveryReceiptWhereUniqueInput | DeliveryReceiptWhereUniqueInput[]
    update?: DeliveryReceiptUpdateWithWhereUniqueWithoutCreatedByInput | DeliveryReceiptUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: DeliveryReceiptUpdateManyWithWhereWithoutCreatedByInput | DeliveryReceiptUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: DeliveryReceiptScalarWhereInput | DeliveryReceiptScalarWhereInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type SupplyOrderUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<SupplyOrderCreateWithoutCreatedByInput, SupplyOrderUncheckedCreateWithoutCreatedByInput> | SupplyOrderCreateWithoutCreatedByInput[] | SupplyOrderUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: SupplyOrderCreateOrConnectWithoutCreatedByInput | SupplyOrderCreateOrConnectWithoutCreatedByInput[]
    upsert?: SupplyOrderUpsertWithWhereUniqueWithoutCreatedByInput | SupplyOrderUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: SupplyOrderCreateManyCreatedByInputEnvelope
    set?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    disconnect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    delete?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    connect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    update?: SupplyOrderUpdateWithWhereUniqueWithoutCreatedByInput | SupplyOrderUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: SupplyOrderUpdateManyWithWhereWithoutCreatedByInput | SupplyOrderUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: SupplyOrderScalarWhereInput | SupplyOrderScalarWhereInput[]
  }

  export type DeliveryReceiptUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<DeliveryReceiptCreateWithoutCreatedByInput, DeliveryReceiptUncheckedCreateWithoutCreatedByInput> | DeliveryReceiptCreateWithoutCreatedByInput[] | DeliveryReceiptUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: DeliveryReceiptCreateOrConnectWithoutCreatedByInput | DeliveryReceiptCreateOrConnectWithoutCreatedByInput[]
    upsert?: DeliveryReceiptUpsertWithWhereUniqueWithoutCreatedByInput | DeliveryReceiptUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: DeliveryReceiptCreateManyCreatedByInputEnvelope
    set?: DeliveryReceiptWhereUniqueInput | DeliveryReceiptWhereUniqueInput[]
    disconnect?: DeliveryReceiptWhereUniqueInput | DeliveryReceiptWhereUniqueInput[]
    delete?: DeliveryReceiptWhereUniqueInput | DeliveryReceiptWhereUniqueInput[]
    connect?: DeliveryReceiptWhereUniqueInput | DeliveryReceiptWhereUniqueInput[]
    update?: DeliveryReceiptUpdateWithWhereUniqueWithoutCreatedByInput | DeliveryReceiptUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: DeliveryReceiptUpdateManyWithWhereWithoutCreatedByInput | DeliveryReceiptUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: DeliveryReceiptScalarWhereInput | DeliveryReceiptScalarWhereInput[]
  }

  export type EnumGardenAccessScopeFieldUpdateOperationsInput = {
    set?: $Enums.GardenAccessScope
  }

  export type SupplyOrderCreateNestedManyWithoutGardenInput = {
    create?: XOR<SupplyOrderCreateWithoutGardenInput, SupplyOrderUncheckedCreateWithoutGardenInput> | SupplyOrderCreateWithoutGardenInput[] | SupplyOrderUncheckedCreateWithoutGardenInput[]
    connectOrCreate?: SupplyOrderCreateOrConnectWithoutGardenInput | SupplyOrderCreateOrConnectWithoutGardenInput[]
    createMany?: SupplyOrderCreateManyGardenInputEnvelope
    connect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutAssignedGardenInput = {
    create?: XOR<UserCreateWithoutAssignedGardenInput, UserUncheckedCreateWithoutAssignedGardenInput> | UserCreateWithoutAssignedGardenInput[] | UserUncheckedCreateWithoutAssignedGardenInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAssignedGardenInput | UserCreateOrConnectWithoutAssignedGardenInput[]
    createMany?: UserCreateManyAssignedGardenInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type SupplyOrderUncheckedCreateNestedManyWithoutGardenInput = {
    create?: XOR<SupplyOrderCreateWithoutGardenInput, SupplyOrderUncheckedCreateWithoutGardenInput> | SupplyOrderCreateWithoutGardenInput[] | SupplyOrderUncheckedCreateWithoutGardenInput[]
    connectOrCreate?: SupplyOrderCreateOrConnectWithoutGardenInput | SupplyOrderCreateOrConnectWithoutGardenInput[]
    createMany?: SupplyOrderCreateManyGardenInputEnvelope
    connect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutAssignedGardenInput = {
    create?: XOR<UserCreateWithoutAssignedGardenInput, UserUncheckedCreateWithoutAssignedGardenInput> | UserCreateWithoutAssignedGardenInput[] | UserUncheckedCreateWithoutAssignedGardenInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAssignedGardenInput | UserCreateOrConnectWithoutAssignedGardenInput[]
    createMany?: UserCreateManyAssignedGardenInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type SupplyOrderUpdateManyWithoutGardenNestedInput = {
    create?: XOR<SupplyOrderCreateWithoutGardenInput, SupplyOrderUncheckedCreateWithoutGardenInput> | SupplyOrderCreateWithoutGardenInput[] | SupplyOrderUncheckedCreateWithoutGardenInput[]
    connectOrCreate?: SupplyOrderCreateOrConnectWithoutGardenInput | SupplyOrderCreateOrConnectWithoutGardenInput[]
    upsert?: SupplyOrderUpsertWithWhereUniqueWithoutGardenInput | SupplyOrderUpsertWithWhereUniqueWithoutGardenInput[]
    createMany?: SupplyOrderCreateManyGardenInputEnvelope
    set?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    disconnect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    delete?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    connect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    update?: SupplyOrderUpdateWithWhereUniqueWithoutGardenInput | SupplyOrderUpdateWithWhereUniqueWithoutGardenInput[]
    updateMany?: SupplyOrderUpdateManyWithWhereWithoutGardenInput | SupplyOrderUpdateManyWithWhereWithoutGardenInput[]
    deleteMany?: SupplyOrderScalarWhereInput | SupplyOrderScalarWhereInput[]
  }

  export type UserUpdateManyWithoutAssignedGardenNestedInput = {
    create?: XOR<UserCreateWithoutAssignedGardenInput, UserUncheckedCreateWithoutAssignedGardenInput> | UserCreateWithoutAssignedGardenInput[] | UserUncheckedCreateWithoutAssignedGardenInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAssignedGardenInput | UserCreateOrConnectWithoutAssignedGardenInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutAssignedGardenInput | UserUpsertWithWhereUniqueWithoutAssignedGardenInput[]
    createMany?: UserCreateManyAssignedGardenInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutAssignedGardenInput | UserUpdateWithWhereUniqueWithoutAssignedGardenInput[]
    updateMany?: UserUpdateManyWithWhereWithoutAssignedGardenInput | UserUpdateManyWithWhereWithoutAssignedGardenInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type SupplyOrderUncheckedUpdateManyWithoutGardenNestedInput = {
    create?: XOR<SupplyOrderCreateWithoutGardenInput, SupplyOrderUncheckedCreateWithoutGardenInput> | SupplyOrderCreateWithoutGardenInput[] | SupplyOrderUncheckedCreateWithoutGardenInput[]
    connectOrCreate?: SupplyOrderCreateOrConnectWithoutGardenInput | SupplyOrderCreateOrConnectWithoutGardenInput[]
    upsert?: SupplyOrderUpsertWithWhereUniqueWithoutGardenInput | SupplyOrderUpsertWithWhereUniqueWithoutGardenInput[]
    createMany?: SupplyOrderCreateManyGardenInputEnvelope
    set?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    disconnect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    delete?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    connect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    update?: SupplyOrderUpdateWithWhereUniqueWithoutGardenInput | SupplyOrderUpdateWithWhereUniqueWithoutGardenInput[]
    updateMany?: SupplyOrderUpdateManyWithWhereWithoutGardenInput | SupplyOrderUpdateManyWithWhereWithoutGardenInput[]
    deleteMany?: SupplyOrderScalarWhereInput | SupplyOrderScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutAssignedGardenNestedInput = {
    create?: XOR<UserCreateWithoutAssignedGardenInput, UserUncheckedCreateWithoutAssignedGardenInput> | UserCreateWithoutAssignedGardenInput[] | UserUncheckedCreateWithoutAssignedGardenInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAssignedGardenInput | UserCreateOrConnectWithoutAssignedGardenInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutAssignedGardenInput | UserUpsertWithWhereUniqueWithoutAssignedGardenInput[]
    createMany?: UserCreateManyAssignedGardenInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutAssignedGardenInput | UserUpdateWithWhereUniqueWithoutAssignedGardenInput[]
    updateMany?: UserUpdateManyWithWhereWithoutAssignedGardenInput | UserUpdateManyWithWhereWithoutAssignedGardenInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type SupplyOrderCreateNestedManyWithoutFertilizerTypeInput = {
    create?: XOR<SupplyOrderCreateWithoutFertilizerTypeInput, SupplyOrderUncheckedCreateWithoutFertilizerTypeInput> | SupplyOrderCreateWithoutFertilizerTypeInput[] | SupplyOrderUncheckedCreateWithoutFertilizerTypeInput[]
    connectOrCreate?: SupplyOrderCreateOrConnectWithoutFertilizerTypeInput | SupplyOrderCreateOrConnectWithoutFertilizerTypeInput[]
    createMany?: SupplyOrderCreateManyFertilizerTypeInputEnvelope
    connect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
  }

  export type SupplyOrderUncheckedCreateNestedManyWithoutFertilizerTypeInput = {
    create?: XOR<SupplyOrderCreateWithoutFertilizerTypeInput, SupplyOrderUncheckedCreateWithoutFertilizerTypeInput> | SupplyOrderCreateWithoutFertilizerTypeInput[] | SupplyOrderUncheckedCreateWithoutFertilizerTypeInput[]
    connectOrCreate?: SupplyOrderCreateOrConnectWithoutFertilizerTypeInput | SupplyOrderCreateOrConnectWithoutFertilizerTypeInput[]
    createMany?: SupplyOrderCreateManyFertilizerTypeInputEnvelope
    connect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
  }

  export type SupplyOrderUpdateManyWithoutFertilizerTypeNestedInput = {
    create?: XOR<SupplyOrderCreateWithoutFertilizerTypeInput, SupplyOrderUncheckedCreateWithoutFertilizerTypeInput> | SupplyOrderCreateWithoutFertilizerTypeInput[] | SupplyOrderUncheckedCreateWithoutFertilizerTypeInput[]
    connectOrCreate?: SupplyOrderCreateOrConnectWithoutFertilizerTypeInput | SupplyOrderCreateOrConnectWithoutFertilizerTypeInput[]
    upsert?: SupplyOrderUpsertWithWhereUniqueWithoutFertilizerTypeInput | SupplyOrderUpsertWithWhereUniqueWithoutFertilizerTypeInput[]
    createMany?: SupplyOrderCreateManyFertilizerTypeInputEnvelope
    set?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    disconnect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    delete?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    connect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    update?: SupplyOrderUpdateWithWhereUniqueWithoutFertilizerTypeInput | SupplyOrderUpdateWithWhereUniqueWithoutFertilizerTypeInput[]
    updateMany?: SupplyOrderUpdateManyWithWhereWithoutFertilizerTypeInput | SupplyOrderUpdateManyWithWhereWithoutFertilizerTypeInput[]
    deleteMany?: SupplyOrderScalarWhereInput | SupplyOrderScalarWhereInput[]
  }

  export type SupplyOrderUncheckedUpdateManyWithoutFertilizerTypeNestedInput = {
    create?: XOR<SupplyOrderCreateWithoutFertilizerTypeInput, SupplyOrderUncheckedCreateWithoutFertilizerTypeInput> | SupplyOrderCreateWithoutFertilizerTypeInput[] | SupplyOrderUncheckedCreateWithoutFertilizerTypeInput[]
    connectOrCreate?: SupplyOrderCreateOrConnectWithoutFertilizerTypeInput | SupplyOrderCreateOrConnectWithoutFertilizerTypeInput[]
    upsert?: SupplyOrderUpsertWithWhereUniqueWithoutFertilizerTypeInput | SupplyOrderUpsertWithWhereUniqueWithoutFertilizerTypeInput[]
    createMany?: SupplyOrderCreateManyFertilizerTypeInputEnvelope
    set?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    disconnect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    delete?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    connect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    update?: SupplyOrderUpdateWithWhereUniqueWithoutFertilizerTypeInput | SupplyOrderUpdateWithWhereUniqueWithoutFertilizerTypeInput[]
    updateMany?: SupplyOrderUpdateManyWithWhereWithoutFertilizerTypeInput | SupplyOrderUpdateManyWithWhereWithoutFertilizerTypeInput[]
    deleteMany?: SupplyOrderScalarWhereInput | SupplyOrderScalarWhereInput[]
  }

  export type SupplyOrderCreateNestedManyWithoutSupplierInput = {
    create?: XOR<SupplyOrderCreateWithoutSupplierInput, SupplyOrderUncheckedCreateWithoutSupplierInput> | SupplyOrderCreateWithoutSupplierInput[] | SupplyOrderUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: SupplyOrderCreateOrConnectWithoutSupplierInput | SupplyOrderCreateOrConnectWithoutSupplierInput[]
    createMany?: SupplyOrderCreateManySupplierInputEnvelope
    connect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
  }

  export type SupplyOrderUncheckedCreateNestedManyWithoutSupplierInput = {
    create?: XOR<SupplyOrderCreateWithoutSupplierInput, SupplyOrderUncheckedCreateWithoutSupplierInput> | SupplyOrderCreateWithoutSupplierInput[] | SupplyOrderUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: SupplyOrderCreateOrConnectWithoutSupplierInput | SupplyOrderCreateOrConnectWithoutSupplierInput[]
    createMany?: SupplyOrderCreateManySupplierInputEnvelope
    connect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
  }

  export type SupplyOrderUpdateManyWithoutSupplierNestedInput = {
    create?: XOR<SupplyOrderCreateWithoutSupplierInput, SupplyOrderUncheckedCreateWithoutSupplierInput> | SupplyOrderCreateWithoutSupplierInput[] | SupplyOrderUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: SupplyOrderCreateOrConnectWithoutSupplierInput | SupplyOrderCreateOrConnectWithoutSupplierInput[]
    upsert?: SupplyOrderUpsertWithWhereUniqueWithoutSupplierInput | SupplyOrderUpsertWithWhereUniqueWithoutSupplierInput[]
    createMany?: SupplyOrderCreateManySupplierInputEnvelope
    set?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    disconnect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    delete?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    connect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    update?: SupplyOrderUpdateWithWhereUniqueWithoutSupplierInput | SupplyOrderUpdateWithWhereUniqueWithoutSupplierInput[]
    updateMany?: SupplyOrderUpdateManyWithWhereWithoutSupplierInput | SupplyOrderUpdateManyWithWhereWithoutSupplierInput[]
    deleteMany?: SupplyOrderScalarWhereInput | SupplyOrderScalarWhereInput[]
  }

  export type SupplyOrderUncheckedUpdateManyWithoutSupplierNestedInput = {
    create?: XOR<SupplyOrderCreateWithoutSupplierInput, SupplyOrderUncheckedCreateWithoutSupplierInput> | SupplyOrderCreateWithoutSupplierInput[] | SupplyOrderUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: SupplyOrderCreateOrConnectWithoutSupplierInput | SupplyOrderCreateOrConnectWithoutSupplierInput[]
    upsert?: SupplyOrderUpsertWithWhereUniqueWithoutSupplierInput | SupplyOrderUpsertWithWhereUniqueWithoutSupplierInput[]
    createMany?: SupplyOrderCreateManySupplierInputEnvelope
    set?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    disconnect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    delete?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    connect?: SupplyOrderWhereUniqueInput | SupplyOrderWhereUniqueInput[]
    update?: SupplyOrderUpdateWithWhereUniqueWithoutSupplierInput | SupplyOrderUpdateWithWhereUniqueWithoutSupplierInput[]
    updateMany?: SupplyOrderUpdateManyWithWhereWithoutSupplierInput | SupplyOrderUpdateManyWithWhereWithoutSupplierInput[]
    deleteMany?: SupplyOrderScalarWhereInput | SupplyOrderScalarWhereInput[]
  }

  export type GardenCreateNestedOneWithoutSupplyOrdersInput = {
    create?: XOR<GardenCreateWithoutSupplyOrdersInput, GardenUncheckedCreateWithoutSupplyOrdersInput>
    connectOrCreate?: GardenCreateOrConnectWithoutSupplyOrdersInput
    connect?: GardenWhereUniqueInput
  }

  export type FertilizerTypeCreateNestedOneWithoutSupplyOrdersInput = {
    create?: XOR<FertilizerTypeCreateWithoutSupplyOrdersInput, FertilizerTypeUncheckedCreateWithoutSupplyOrdersInput>
    connectOrCreate?: FertilizerTypeCreateOrConnectWithoutSupplyOrdersInput
    connect?: FertilizerTypeWhereUniqueInput
  }

  export type SupplierCreateNestedOneWithoutSupplyOrdersInput = {
    create?: XOR<SupplierCreateWithoutSupplyOrdersInput, SupplierUncheckedCreateWithoutSupplyOrdersInput>
    connectOrCreate?: SupplierCreateOrConnectWithoutSupplyOrdersInput
    connect?: SupplierWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCreatedSupplyInput = {
    create?: XOR<UserCreateWithoutCreatedSupplyInput, UserUncheckedCreateWithoutCreatedSupplyInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedSupplyInput
    connect?: UserWhereUniqueInput
  }

  export type DeliveryReceiptCreateNestedManyWithoutSupplyOrderInput = {
    create?: XOR<DeliveryReceiptCreateWithoutSupplyOrderInput, DeliveryReceiptUncheckedCreateWithoutSupplyOrderInput> | DeliveryReceiptCreateWithoutSupplyOrderInput[] | DeliveryReceiptUncheckedCreateWithoutSupplyOrderInput[]
    connectOrCreate?: DeliveryReceiptCreateOrConnectWithoutSupplyOrderInput | DeliveryReceiptCreateOrConnectWithoutSupplyOrderInput[]
    createMany?: DeliveryReceiptCreateManySupplyOrderInputEnvelope
    connect?: DeliveryReceiptWhereUniqueInput | DeliveryReceiptWhereUniqueInput[]
  }

  export type DeliveryReceiptUncheckedCreateNestedManyWithoutSupplyOrderInput = {
    create?: XOR<DeliveryReceiptCreateWithoutSupplyOrderInput, DeliveryReceiptUncheckedCreateWithoutSupplyOrderInput> | DeliveryReceiptCreateWithoutSupplyOrderInput[] | DeliveryReceiptUncheckedCreateWithoutSupplyOrderInput[]
    connectOrCreate?: DeliveryReceiptCreateOrConnectWithoutSupplyOrderInput | DeliveryReceiptCreateOrConnectWithoutSupplyOrderInput[]
    createMany?: DeliveryReceiptCreateManySupplyOrderInputEnvelope
    connect?: DeliveryReceiptWhereUniqueInput | DeliveryReceiptWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumSupplyBudgetTypeFieldUpdateOperationsInput = {
    set?: $Enums.SupplyBudgetType
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type GardenUpdateOneRequiredWithoutSupplyOrdersNestedInput = {
    create?: XOR<GardenCreateWithoutSupplyOrdersInput, GardenUncheckedCreateWithoutSupplyOrdersInput>
    connectOrCreate?: GardenCreateOrConnectWithoutSupplyOrdersInput
    upsert?: GardenUpsertWithoutSupplyOrdersInput
    connect?: GardenWhereUniqueInput
    update?: XOR<XOR<GardenUpdateToOneWithWhereWithoutSupplyOrdersInput, GardenUpdateWithoutSupplyOrdersInput>, GardenUncheckedUpdateWithoutSupplyOrdersInput>
  }

  export type FertilizerTypeUpdateOneRequiredWithoutSupplyOrdersNestedInput = {
    create?: XOR<FertilizerTypeCreateWithoutSupplyOrdersInput, FertilizerTypeUncheckedCreateWithoutSupplyOrdersInput>
    connectOrCreate?: FertilizerTypeCreateOrConnectWithoutSupplyOrdersInput
    upsert?: FertilizerTypeUpsertWithoutSupplyOrdersInput
    connect?: FertilizerTypeWhereUniqueInput
    update?: XOR<XOR<FertilizerTypeUpdateToOneWithWhereWithoutSupplyOrdersInput, FertilizerTypeUpdateWithoutSupplyOrdersInput>, FertilizerTypeUncheckedUpdateWithoutSupplyOrdersInput>
  }

  export type SupplierUpdateOneRequiredWithoutSupplyOrdersNestedInput = {
    create?: XOR<SupplierCreateWithoutSupplyOrdersInput, SupplierUncheckedCreateWithoutSupplyOrdersInput>
    connectOrCreate?: SupplierCreateOrConnectWithoutSupplyOrdersInput
    upsert?: SupplierUpsertWithoutSupplyOrdersInput
    connect?: SupplierWhereUniqueInput
    update?: XOR<XOR<SupplierUpdateToOneWithWhereWithoutSupplyOrdersInput, SupplierUpdateWithoutSupplyOrdersInput>, SupplierUncheckedUpdateWithoutSupplyOrdersInput>
  }

  export type UserUpdateOneRequiredWithoutCreatedSupplyNestedInput = {
    create?: XOR<UserCreateWithoutCreatedSupplyInput, UserUncheckedCreateWithoutCreatedSupplyInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedSupplyInput
    upsert?: UserUpsertWithoutCreatedSupplyInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedSupplyInput, UserUpdateWithoutCreatedSupplyInput>, UserUncheckedUpdateWithoutCreatedSupplyInput>
  }

  export type DeliveryReceiptUpdateManyWithoutSupplyOrderNestedInput = {
    create?: XOR<DeliveryReceiptCreateWithoutSupplyOrderInput, DeliveryReceiptUncheckedCreateWithoutSupplyOrderInput> | DeliveryReceiptCreateWithoutSupplyOrderInput[] | DeliveryReceiptUncheckedCreateWithoutSupplyOrderInput[]
    connectOrCreate?: DeliveryReceiptCreateOrConnectWithoutSupplyOrderInput | DeliveryReceiptCreateOrConnectWithoutSupplyOrderInput[]
    upsert?: DeliveryReceiptUpsertWithWhereUniqueWithoutSupplyOrderInput | DeliveryReceiptUpsertWithWhereUniqueWithoutSupplyOrderInput[]
    createMany?: DeliveryReceiptCreateManySupplyOrderInputEnvelope
    set?: DeliveryReceiptWhereUniqueInput | DeliveryReceiptWhereUniqueInput[]
    disconnect?: DeliveryReceiptWhereUniqueInput | DeliveryReceiptWhereUniqueInput[]
    delete?: DeliveryReceiptWhereUniqueInput | DeliveryReceiptWhereUniqueInput[]
    connect?: DeliveryReceiptWhereUniqueInput | DeliveryReceiptWhereUniqueInput[]
    update?: DeliveryReceiptUpdateWithWhereUniqueWithoutSupplyOrderInput | DeliveryReceiptUpdateWithWhereUniqueWithoutSupplyOrderInput[]
    updateMany?: DeliveryReceiptUpdateManyWithWhereWithoutSupplyOrderInput | DeliveryReceiptUpdateManyWithWhereWithoutSupplyOrderInput[]
    deleteMany?: DeliveryReceiptScalarWhereInput | DeliveryReceiptScalarWhereInput[]
  }

  export type DeliveryReceiptUncheckedUpdateManyWithoutSupplyOrderNestedInput = {
    create?: XOR<DeliveryReceiptCreateWithoutSupplyOrderInput, DeliveryReceiptUncheckedCreateWithoutSupplyOrderInput> | DeliveryReceiptCreateWithoutSupplyOrderInput[] | DeliveryReceiptUncheckedCreateWithoutSupplyOrderInput[]
    connectOrCreate?: DeliveryReceiptCreateOrConnectWithoutSupplyOrderInput | DeliveryReceiptCreateOrConnectWithoutSupplyOrderInput[]
    upsert?: DeliveryReceiptUpsertWithWhereUniqueWithoutSupplyOrderInput | DeliveryReceiptUpsertWithWhereUniqueWithoutSupplyOrderInput[]
    createMany?: DeliveryReceiptCreateManySupplyOrderInputEnvelope
    set?: DeliveryReceiptWhereUniqueInput | DeliveryReceiptWhereUniqueInput[]
    disconnect?: DeliveryReceiptWhereUniqueInput | DeliveryReceiptWhereUniqueInput[]
    delete?: DeliveryReceiptWhereUniqueInput | DeliveryReceiptWhereUniqueInput[]
    connect?: DeliveryReceiptWhereUniqueInput | DeliveryReceiptWhereUniqueInput[]
    update?: DeliveryReceiptUpdateWithWhereUniqueWithoutSupplyOrderInput | DeliveryReceiptUpdateWithWhereUniqueWithoutSupplyOrderInput[]
    updateMany?: DeliveryReceiptUpdateManyWithWhereWithoutSupplyOrderInput | DeliveryReceiptUpdateManyWithWhereWithoutSupplyOrderInput[]
    deleteMany?: DeliveryReceiptScalarWhereInput | DeliveryReceiptScalarWhereInput[]
  }

  export type SupplyOrderCreateNestedOneWithoutDeliveriesInput = {
    create?: XOR<SupplyOrderCreateWithoutDeliveriesInput, SupplyOrderUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: SupplyOrderCreateOrConnectWithoutDeliveriesInput
    connect?: SupplyOrderWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCreatedDeliveriesInput = {
    create?: XOR<UserCreateWithoutCreatedDeliveriesInput, UserUncheckedCreateWithoutCreatedDeliveriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedDeliveriesInput
    connect?: UserWhereUniqueInput
  }

  export type SupplyOrderUpdateOneRequiredWithoutDeliveriesNestedInput = {
    create?: XOR<SupplyOrderCreateWithoutDeliveriesInput, SupplyOrderUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: SupplyOrderCreateOrConnectWithoutDeliveriesInput
    upsert?: SupplyOrderUpsertWithoutDeliveriesInput
    connect?: SupplyOrderWhereUniqueInput
    update?: XOR<XOR<SupplyOrderUpdateToOneWithWhereWithoutDeliveriesInput, SupplyOrderUpdateWithoutDeliveriesInput>, SupplyOrderUncheckedUpdateWithoutDeliveriesInput>
  }

  export type UserUpdateOneRequiredWithoutCreatedDeliveriesNestedInput = {
    create?: XOR<UserCreateWithoutCreatedDeliveriesInput, UserUncheckedCreateWithoutCreatedDeliveriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedDeliveriesInput
    upsert?: UserUpsertWithoutCreatedDeliveriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedDeliveriesInput, UserUpdateWithoutCreatedDeliveriesInput>, UserUncheckedUpdateWithoutCreatedDeliveriesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumGardenAccessScopeFilter<$PrismaModel = never> = {
    equals?: $Enums.GardenAccessScope | EnumGardenAccessScopeFieldRefInput<$PrismaModel>
    in?: $Enums.GardenAccessScope[] | ListEnumGardenAccessScopeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GardenAccessScope[] | ListEnumGardenAccessScopeFieldRefInput<$PrismaModel>
    not?: NestedEnumGardenAccessScopeFilter<$PrismaModel> | $Enums.GardenAccessScope
  }

  export type NestedEnumGardenAccessScopeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GardenAccessScope | EnumGardenAccessScopeFieldRefInput<$PrismaModel>
    in?: $Enums.GardenAccessScope[] | ListEnumGardenAccessScopeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GardenAccessScope[] | ListEnumGardenAccessScopeFieldRefInput<$PrismaModel>
    not?: NestedEnumGardenAccessScopeWithAggregatesFilter<$PrismaModel> | $Enums.GardenAccessScope
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGardenAccessScopeFilter<$PrismaModel>
    _max?: NestedEnumGardenAccessScopeFilter<$PrismaModel>
  }

  export type NestedEnumSupplyBudgetTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SupplyBudgetType | EnumSupplyBudgetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SupplyBudgetType[] | ListEnumSupplyBudgetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SupplyBudgetType[] | ListEnumSupplyBudgetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSupplyBudgetTypeFilter<$PrismaModel> | $Enums.SupplyBudgetType
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumSupplyBudgetTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SupplyBudgetType | EnumSupplyBudgetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SupplyBudgetType[] | ListEnumSupplyBudgetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SupplyBudgetType[] | ListEnumSupplyBudgetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSupplyBudgetTypeWithAggregatesFilter<$PrismaModel> | $Enums.SupplyBudgetType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSupplyBudgetTypeFilter<$PrismaModel>
    _max?: NestedEnumSupplyBudgetTypeFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type GardenCreateWithoutAssignedUsersInput = {
    id?: string
    name: string
    code: string
    address?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    supplyOrders?: SupplyOrderCreateNestedManyWithoutGardenInput
  }

  export type GardenUncheckedCreateWithoutAssignedUsersInput = {
    id?: string
    name: string
    code: string
    address?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    supplyOrders?: SupplyOrderUncheckedCreateNestedManyWithoutGardenInput
  }

  export type GardenCreateOrConnectWithoutAssignedUsersInput = {
    where: GardenWhereUniqueInput
    create: XOR<GardenCreateWithoutAssignedUsersInput, GardenUncheckedCreateWithoutAssignedUsersInput>
  }

  export type SupplyOrderCreateWithoutCreatedByInput = {
    id?: string
    sp2bjNumber: string
    contractStartDate: Date | string
    contractEndDate: Date | string
    quantityOrdered: number
    budgetType: $Enums.SupplyBudgetType
    unitPrice: Decimal | DecimalJsLike | number | string
    freightCost: Decimal | DecimalJsLike | number | string
    totalCost: Decimal | DecimalJsLike | number | string
    ppnAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    garden: GardenCreateNestedOneWithoutSupplyOrdersInput
    fertilizerType: FertilizerTypeCreateNestedOneWithoutSupplyOrdersInput
    supplier: SupplierCreateNestedOneWithoutSupplyOrdersInput
    deliveries?: DeliveryReceiptCreateNestedManyWithoutSupplyOrderInput
  }

  export type SupplyOrderUncheckedCreateWithoutCreatedByInput = {
    id?: string
    gardenId: string
    fertilizerTypeId: string
    supplierId: string
    sp2bjNumber: string
    contractStartDate: Date | string
    contractEndDate: Date | string
    quantityOrdered: number
    budgetType: $Enums.SupplyBudgetType
    unitPrice: Decimal | DecimalJsLike | number | string
    freightCost: Decimal | DecimalJsLike | number | string
    totalCost: Decimal | DecimalJsLike | number | string
    ppnAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveries?: DeliveryReceiptUncheckedCreateNestedManyWithoutSupplyOrderInput
  }

  export type SupplyOrderCreateOrConnectWithoutCreatedByInput = {
    where: SupplyOrderWhereUniqueInput
    create: XOR<SupplyOrderCreateWithoutCreatedByInput, SupplyOrderUncheckedCreateWithoutCreatedByInput>
  }

  export type SupplyOrderCreateManyCreatedByInputEnvelope = {
    data: SupplyOrderCreateManyCreatedByInput | SupplyOrderCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type DeliveryReceiptCreateWithoutCreatedByInput = {
    id?: string
    licensePlate: string
    receivedDate: Date | string
    quantityDelivered: number
    sackCount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    supplyOrder: SupplyOrderCreateNestedOneWithoutDeliveriesInput
  }

  export type DeliveryReceiptUncheckedCreateWithoutCreatedByInput = {
    id?: string
    supplyOrderId: string
    licensePlate: string
    receivedDate: Date | string
    quantityDelivered: number
    sackCount: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryReceiptCreateOrConnectWithoutCreatedByInput = {
    where: DeliveryReceiptWhereUniqueInput
    create: XOR<DeliveryReceiptCreateWithoutCreatedByInput, DeliveryReceiptUncheckedCreateWithoutCreatedByInput>
  }

  export type DeliveryReceiptCreateManyCreatedByInputEnvelope = {
    data: DeliveryReceiptCreateManyCreatedByInput | DeliveryReceiptCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type GardenUpsertWithoutAssignedUsersInput = {
    update: XOR<GardenUpdateWithoutAssignedUsersInput, GardenUncheckedUpdateWithoutAssignedUsersInput>
    create: XOR<GardenCreateWithoutAssignedUsersInput, GardenUncheckedCreateWithoutAssignedUsersInput>
    where?: GardenWhereInput
  }

  export type GardenUpdateToOneWithWhereWithoutAssignedUsersInput = {
    where?: GardenWhereInput
    data: XOR<GardenUpdateWithoutAssignedUsersInput, GardenUncheckedUpdateWithoutAssignedUsersInput>
  }

  export type GardenUpdateWithoutAssignedUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplyOrders?: SupplyOrderUpdateManyWithoutGardenNestedInput
  }

  export type GardenUncheckedUpdateWithoutAssignedUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplyOrders?: SupplyOrderUncheckedUpdateManyWithoutGardenNestedInput
  }

  export type SupplyOrderUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: SupplyOrderWhereUniqueInput
    update: XOR<SupplyOrderUpdateWithoutCreatedByInput, SupplyOrderUncheckedUpdateWithoutCreatedByInput>
    create: XOR<SupplyOrderCreateWithoutCreatedByInput, SupplyOrderUncheckedCreateWithoutCreatedByInput>
  }

  export type SupplyOrderUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: SupplyOrderWhereUniqueInput
    data: XOR<SupplyOrderUpdateWithoutCreatedByInput, SupplyOrderUncheckedUpdateWithoutCreatedByInput>
  }

  export type SupplyOrderUpdateManyWithWhereWithoutCreatedByInput = {
    where: SupplyOrderScalarWhereInput
    data: XOR<SupplyOrderUpdateManyMutationInput, SupplyOrderUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type SupplyOrderScalarWhereInput = {
    AND?: SupplyOrderScalarWhereInput | SupplyOrderScalarWhereInput[]
    OR?: SupplyOrderScalarWhereInput[]
    NOT?: SupplyOrderScalarWhereInput | SupplyOrderScalarWhereInput[]
    id?: StringFilter<"SupplyOrder"> | string
    gardenId?: StringFilter<"SupplyOrder"> | string
    fertilizerTypeId?: StringFilter<"SupplyOrder"> | string
    supplierId?: StringFilter<"SupplyOrder"> | string
    sp2bjNumber?: StringFilter<"SupplyOrder"> | string
    contractStartDate?: DateTimeFilter<"SupplyOrder"> | Date | string
    contractEndDate?: DateTimeFilter<"SupplyOrder"> | Date | string
    quantityOrdered?: IntFilter<"SupplyOrder"> | number
    budgetType?: EnumSupplyBudgetTypeFilter<"SupplyOrder"> | $Enums.SupplyBudgetType
    unitPrice?: DecimalFilter<"SupplyOrder"> | Decimal | DecimalJsLike | number | string
    freightCost?: DecimalFilter<"SupplyOrder"> | Decimal | DecimalJsLike | number | string
    totalCost?: DecimalFilter<"SupplyOrder"> | Decimal | DecimalJsLike | number | string
    ppnAmount?: DecimalFilter<"SupplyOrder"> | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFilter<"SupplyOrder"> | Decimal | DecimalJsLike | number | string
    createdById?: StringFilter<"SupplyOrder"> | string
    createdAt?: DateTimeFilter<"SupplyOrder"> | Date | string
    updatedAt?: DateTimeFilter<"SupplyOrder"> | Date | string
  }

  export type DeliveryReceiptUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: DeliveryReceiptWhereUniqueInput
    update: XOR<DeliveryReceiptUpdateWithoutCreatedByInput, DeliveryReceiptUncheckedUpdateWithoutCreatedByInput>
    create: XOR<DeliveryReceiptCreateWithoutCreatedByInput, DeliveryReceiptUncheckedCreateWithoutCreatedByInput>
  }

  export type DeliveryReceiptUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: DeliveryReceiptWhereUniqueInput
    data: XOR<DeliveryReceiptUpdateWithoutCreatedByInput, DeliveryReceiptUncheckedUpdateWithoutCreatedByInput>
  }

  export type DeliveryReceiptUpdateManyWithWhereWithoutCreatedByInput = {
    where: DeliveryReceiptScalarWhereInput
    data: XOR<DeliveryReceiptUpdateManyMutationInput, DeliveryReceiptUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type DeliveryReceiptScalarWhereInput = {
    AND?: DeliveryReceiptScalarWhereInput | DeliveryReceiptScalarWhereInput[]
    OR?: DeliveryReceiptScalarWhereInput[]
    NOT?: DeliveryReceiptScalarWhereInput | DeliveryReceiptScalarWhereInput[]
    id?: StringFilter<"DeliveryReceipt"> | string
    supplyOrderId?: StringFilter<"DeliveryReceipt"> | string
    licensePlate?: StringFilter<"DeliveryReceipt"> | string
    receivedDate?: DateTimeFilter<"DeliveryReceipt"> | Date | string
    quantityDelivered?: IntFilter<"DeliveryReceipt"> | number
    sackCount?: IntFilter<"DeliveryReceipt"> | number
    createdById?: StringFilter<"DeliveryReceipt"> | string
    createdAt?: DateTimeFilter<"DeliveryReceipt"> | Date | string
    updatedAt?: DateTimeFilter<"DeliveryReceipt"> | Date | string
  }

  export type SupplyOrderCreateWithoutGardenInput = {
    id?: string
    sp2bjNumber: string
    contractStartDate: Date | string
    contractEndDate: Date | string
    quantityOrdered: number
    budgetType: $Enums.SupplyBudgetType
    unitPrice: Decimal | DecimalJsLike | number | string
    freightCost: Decimal | DecimalJsLike | number | string
    totalCost: Decimal | DecimalJsLike | number | string
    ppnAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    fertilizerType: FertilizerTypeCreateNestedOneWithoutSupplyOrdersInput
    supplier: SupplierCreateNestedOneWithoutSupplyOrdersInput
    createdBy: UserCreateNestedOneWithoutCreatedSupplyInput
    deliveries?: DeliveryReceiptCreateNestedManyWithoutSupplyOrderInput
  }

  export type SupplyOrderUncheckedCreateWithoutGardenInput = {
    id?: string
    fertilizerTypeId: string
    supplierId: string
    sp2bjNumber: string
    contractStartDate: Date | string
    contractEndDate: Date | string
    quantityOrdered: number
    budgetType: $Enums.SupplyBudgetType
    unitPrice: Decimal | DecimalJsLike | number | string
    freightCost: Decimal | DecimalJsLike | number | string
    totalCost: Decimal | DecimalJsLike | number | string
    ppnAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveries?: DeliveryReceiptUncheckedCreateNestedManyWithoutSupplyOrderInput
  }

  export type SupplyOrderCreateOrConnectWithoutGardenInput = {
    where: SupplyOrderWhereUniqueInput
    create: XOR<SupplyOrderCreateWithoutGardenInput, SupplyOrderUncheckedCreateWithoutGardenInput>
  }

  export type SupplyOrderCreateManyGardenInputEnvelope = {
    data: SupplyOrderCreateManyGardenInput | SupplyOrderCreateManyGardenInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutAssignedGardenInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdSupply?: SupplyOrderCreateNestedManyWithoutCreatedByInput
    createdDeliveries?: DeliveryReceiptCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutAssignedGardenInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdSupply?: SupplyOrderUncheckedCreateNestedManyWithoutCreatedByInput
    createdDeliveries?: DeliveryReceiptUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutAssignedGardenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssignedGardenInput, UserUncheckedCreateWithoutAssignedGardenInput>
  }

  export type UserCreateManyAssignedGardenInputEnvelope = {
    data: UserCreateManyAssignedGardenInput | UserCreateManyAssignedGardenInput[]
    skipDuplicates?: boolean
  }

  export type SupplyOrderUpsertWithWhereUniqueWithoutGardenInput = {
    where: SupplyOrderWhereUniqueInput
    update: XOR<SupplyOrderUpdateWithoutGardenInput, SupplyOrderUncheckedUpdateWithoutGardenInput>
    create: XOR<SupplyOrderCreateWithoutGardenInput, SupplyOrderUncheckedCreateWithoutGardenInput>
  }

  export type SupplyOrderUpdateWithWhereUniqueWithoutGardenInput = {
    where: SupplyOrderWhereUniqueInput
    data: XOR<SupplyOrderUpdateWithoutGardenInput, SupplyOrderUncheckedUpdateWithoutGardenInput>
  }

  export type SupplyOrderUpdateManyWithWhereWithoutGardenInput = {
    where: SupplyOrderScalarWhereInput
    data: XOR<SupplyOrderUpdateManyMutationInput, SupplyOrderUncheckedUpdateManyWithoutGardenInput>
  }

  export type UserUpsertWithWhereUniqueWithoutAssignedGardenInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutAssignedGardenInput, UserUncheckedUpdateWithoutAssignedGardenInput>
    create: XOR<UserCreateWithoutAssignedGardenInput, UserUncheckedCreateWithoutAssignedGardenInput>
  }

  export type UserUpdateWithWhereUniqueWithoutAssignedGardenInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutAssignedGardenInput, UserUncheckedUpdateWithoutAssignedGardenInput>
  }

  export type UserUpdateManyWithWhereWithoutAssignedGardenInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutAssignedGardenInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isActive?: BoolFilter<"User"> | boolean
    assignedGardenId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type SupplyOrderCreateWithoutFertilizerTypeInput = {
    id?: string
    sp2bjNumber: string
    contractStartDate: Date | string
    contractEndDate: Date | string
    quantityOrdered: number
    budgetType: $Enums.SupplyBudgetType
    unitPrice: Decimal | DecimalJsLike | number | string
    freightCost: Decimal | DecimalJsLike | number | string
    totalCost: Decimal | DecimalJsLike | number | string
    ppnAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    garden: GardenCreateNestedOneWithoutSupplyOrdersInput
    supplier: SupplierCreateNestedOneWithoutSupplyOrdersInput
    createdBy: UserCreateNestedOneWithoutCreatedSupplyInput
    deliveries?: DeliveryReceiptCreateNestedManyWithoutSupplyOrderInput
  }

  export type SupplyOrderUncheckedCreateWithoutFertilizerTypeInput = {
    id?: string
    gardenId: string
    supplierId: string
    sp2bjNumber: string
    contractStartDate: Date | string
    contractEndDate: Date | string
    quantityOrdered: number
    budgetType: $Enums.SupplyBudgetType
    unitPrice: Decimal | DecimalJsLike | number | string
    freightCost: Decimal | DecimalJsLike | number | string
    totalCost: Decimal | DecimalJsLike | number | string
    ppnAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveries?: DeliveryReceiptUncheckedCreateNestedManyWithoutSupplyOrderInput
  }

  export type SupplyOrderCreateOrConnectWithoutFertilizerTypeInput = {
    where: SupplyOrderWhereUniqueInput
    create: XOR<SupplyOrderCreateWithoutFertilizerTypeInput, SupplyOrderUncheckedCreateWithoutFertilizerTypeInput>
  }

  export type SupplyOrderCreateManyFertilizerTypeInputEnvelope = {
    data: SupplyOrderCreateManyFertilizerTypeInput | SupplyOrderCreateManyFertilizerTypeInput[]
    skipDuplicates?: boolean
  }

  export type SupplyOrderUpsertWithWhereUniqueWithoutFertilizerTypeInput = {
    where: SupplyOrderWhereUniqueInput
    update: XOR<SupplyOrderUpdateWithoutFertilizerTypeInput, SupplyOrderUncheckedUpdateWithoutFertilizerTypeInput>
    create: XOR<SupplyOrderCreateWithoutFertilizerTypeInput, SupplyOrderUncheckedCreateWithoutFertilizerTypeInput>
  }

  export type SupplyOrderUpdateWithWhereUniqueWithoutFertilizerTypeInput = {
    where: SupplyOrderWhereUniqueInput
    data: XOR<SupplyOrderUpdateWithoutFertilizerTypeInput, SupplyOrderUncheckedUpdateWithoutFertilizerTypeInput>
  }

  export type SupplyOrderUpdateManyWithWhereWithoutFertilizerTypeInput = {
    where: SupplyOrderScalarWhereInput
    data: XOR<SupplyOrderUpdateManyMutationInput, SupplyOrderUncheckedUpdateManyWithoutFertilizerTypeInput>
  }

  export type SupplyOrderCreateWithoutSupplierInput = {
    id?: string
    sp2bjNumber: string
    contractStartDate: Date | string
    contractEndDate: Date | string
    quantityOrdered: number
    budgetType: $Enums.SupplyBudgetType
    unitPrice: Decimal | DecimalJsLike | number | string
    freightCost: Decimal | DecimalJsLike | number | string
    totalCost: Decimal | DecimalJsLike | number | string
    ppnAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    garden: GardenCreateNestedOneWithoutSupplyOrdersInput
    fertilizerType: FertilizerTypeCreateNestedOneWithoutSupplyOrdersInput
    createdBy: UserCreateNestedOneWithoutCreatedSupplyInput
    deliveries?: DeliveryReceiptCreateNestedManyWithoutSupplyOrderInput
  }

  export type SupplyOrderUncheckedCreateWithoutSupplierInput = {
    id?: string
    gardenId: string
    fertilizerTypeId: string
    sp2bjNumber: string
    contractStartDate: Date | string
    contractEndDate: Date | string
    quantityOrdered: number
    budgetType: $Enums.SupplyBudgetType
    unitPrice: Decimal | DecimalJsLike | number | string
    freightCost: Decimal | DecimalJsLike | number | string
    totalCost: Decimal | DecimalJsLike | number | string
    ppnAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveries?: DeliveryReceiptUncheckedCreateNestedManyWithoutSupplyOrderInput
  }

  export type SupplyOrderCreateOrConnectWithoutSupplierInput = {
    where: SupplyOrderWhereUniqueInput
    create: XOR<SupplyOrderCreateWithoutSupplierInput, SupplyOrderUncheckedCreateWithoutSupplierInput>
  }

  export type SupplyOrderCreateManySupplierInputEnvelope = {
    data: SupplyOrderCreateManySupplierInput | SupplyOrderCreateManySupplierInput[]
    skipDuplicates?: boolean
  }

  export type SupplyOrderUpsertWithWhereUniqueWithoutSupplierInput = {
    where: SupplyOrderWhereUniqueInput
    update: XOR<SupplyOrderUpdateWithoutSupplierInput, SupplyOrderUncheckedUpdateWithoutSupplierInput>
    create: XOR<SupplyOrderCreateWithoutSupplierInput, SupplyOrderUncheckedCreateWithoutSupplierInput>
  }

  export type SupplyOrderUpdateWithWhereUniqueWithoutSupplierInput = {
    where: SupplyOrderWhereUniqueInput
    data: XOR<SupplyOrderUpdateWithoutSupplierInput, SupplyOrderUncheckedUpdateWithoutSupplierInput>
  }

  export type SupplyOrderUpdateManyWithWhereWithoutSupplierInput = {
    where: SupplyOrderScalarWhereInput
    data: XOR<SupplyOrderUpdateManyMutationInput, SupplyOrderUncheckedUpdateManyWithoutSupplierInput>
  }

  export type GardenCreateWithoutSupplyOrdersInput = {
    id?: string
    name: string
    code: string
    address?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedUsers?: UserCreateNestedManyWithoutAssignedGardenInput
  }

  export type GardenUncheckedCreateWithoutSupplyOrdersInput = {
    id?: string
    name: string
    code: string
    address?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedUsers?: UserUncheckedCreateNestedManyWithoutAssignedGardenInput
  }

  export type GardenCreateOrConnectWithoutSupplyOrdersInput = {
    where: GardenWhereUniqueInput
    create: XOR<GardenCreateWithoutSupplyOrdersInput, GardenUncheckedCreateWithoutSupplyOrdersInput>
  }

  export type FertilizerTypeCreateWithoutSupplyOrdersInput = {
    id?: string
    name: string
    unit?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FertilizerTypeUncheckedCreateWithoutSupplyOrdersInput = {
    id?: string
    name: string
    unit?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FertilizerTypeCreateOrConnectWithoutSupplyOrdersInput = {
    where: FertilizerTypeWhereUniqueInput
    create: XOR<FertilizerTypeCreateWithoutSupplyOrdersInput, FertilizerTypeUncheckedCreateWithoutSupplyOrdersInput>
  }

  export type SupplierCreateWithoutSupplyOrdersInput = {
    id?: string
    name: string
    contactName?: string | null
    address?: string | null
    phone?: string | null
    email?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierUncheckedCreateWithoutSupplyOrdersInput = {
    id?: string
    name: string
    contactName?: string | null
    address?: string | null
    phone?: string | null
    email?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierCreateOrConnectWithoutSupplyOrdersInput = {
    where: SupplierWhereUniqueInput
    create: XOR<SupplierCreateWithoutSupplyOrdersInput, SupplierUncheckedCreateWithoutSupplyOrdersInput>
  }

  export type UserCreateWithoutCreatedSupplyInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedGarden?: GardenCreateNestedOneWithoutAssignedUsersInput
    createdDeliveries?: DeliveryReceiptCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutCreatedSupplyInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    isActive?: boolean
    assignedGardenId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdDeliveries?: DeliveryReceiptUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutCreatedSupplyInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedSupplyInput, UserUncheckedCreateWithoutCreatedSupplyInput>
  }

  export type DeliveryReceiptCreateWithoutSupplyOrderInput = {
    id?: string
    licensePlate: string
    receivedDate: Date | string
    quantityDelivered: number
    sackCount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedDeliveriesInput
  }

  export type DeliveryReceiptUncheckedCreateWithoutSupplyOrderInput = {
    id?: string
    licensePlate: string
    receivedDate: Date | string
    quantityDelivered: number
    sackCount: number
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryReceiptCreateOrConnectWithoutSupplyOrderInput = {
    where: DeliveryReceiptWhereUniqueInput
    create: XOR<DeliveryReceiptCreateWithoutSupplyOrderInput, DeliveryReceiptUncheckedCreateWithoutSupplyOrderInput>
  }

  export type DeliveryReceiptCreateManySupplyOrderInputEnvelope = {
    data: DeliveryReceiptCreateManySupplyOrderInput | DeliveryReceiptCreateManySupplyOrderInput[]
    skipDuplicates?: boolean
  }

  export type GardenUpsertWithoutSupplyOrdersInput = {
    update: XOR<GardenUpdateWithoutSupplyOrdersInput, GardenUncheckedUpdateWithoutSupplyOrdersInput>
    create: XOR<GardenCreateWithoutSupplyOrdersInput, GardenUncheckedCreateWithoutSupplyOrdersInput>
    where?: GardenWhereInput
  }

  export type GardenUpdateToOneWithWhereWithoutSupplyOrdersInput = {
    where?: GardenWhereInput
    data: XOR<GardenUpdateWithoutSupplyOrdersInput, GardenUncheckedUpdateWithoutSupplyOrdersInput>
  }

  export type GardenUpdateWithoutSupplyOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedUsers?: UserUpdateManyWithoutAssignedGardenNestedInput
  }

  export type GardenUncheckedUpdateWithoutSupplyOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedUsers?: UserUncheckedUpdateManyWithoutAssignedGardenNestedInput
  }

  export type FertilizerTypeUpsertWithoutSupplyOrdersInput = {
    update: XOR<FertilizerTypeUpdateWithoutSupplyOrdersInput, FertilizerTypeUncheckedUpdateWithoutSupplyOrdersInput>
    create: XOR<FertilizerTypeCreateWithoutSupplyOrdersInput, FertilizerTypeUncheckedCreateWithoutSupplyOrdersInput>
    where?: FertilizerTypeWhereInput
  }

  export type FertilizerTypeUpdateToOneWithWhereWithoutSupplyOrdersInput = {
    where?: FertilizerTypeWhereInput
    data: XOR<FertilizerTypeUpdateWithoutSupplyOrdersInput, FertilizerTypeUncheckedUpdateWithoutSupplyOrdersInput>
  }

  export type FertilizerTypeUpdateWithoutSupplyOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FertilizerTypeUncheckedUpdateWithoutSupplyOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierUpsertWithoutSupplyOrdersInput = {
    update: XOR<SupplierUpdateWithoutSupplyOrdersInput, SupplierUncheckedUpdateWithoutSupplyOrdersInput>
    create: XOR<SupplierCreateWithoutSupplyOrdersInput, SupplierUncheckedCreateWithoutSupplyOrdersInput>
    where?: SupplierWhereInput
  }

  export type SupplierUpdateToOneWithWhereWithoutSupplyOrdersInput = {
    where?: SupplierWhereInput
    data: XOR<SupplierUpdateWithoutSupplyOrdersInput, SupplierUncheckedUpdateWithoutSupplyOrdersInput>
  }

  export type SupplierUpdateWithoutSupplyOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierUncheckedUpdateWithoutSupplyOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutCreatedSupplyInput = {
    update: XOR<UserUpdateWithoutCreatedSupplyInput, UserUncheckedUpdateWithoutCreatedSupplyInput>
    create: XOR<UserCreateWithoutCreatedSupplyInput, UserUncheckedCreateWithoutCreatedSupplyInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedSupplyInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedSupplyInput, UserUncheckedUpdateWithoutCreatedSupplyInput>
  }

  export type UserUpdateWithoutCreatedSupplyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedGarden?: GardenUpdateOneWithoutAssignedUsersNestedInput
    createdDeliveries?: DeliveryReceiptUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedSupplyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    assignedGardenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdDeliveries?: DeliveryReceiptUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type DeliveryReceiptUpsertWithWhereUniqueWithoutSupplyOrderInput = {
    where: DeliveryReceiptWhereUniqueInput
    update: XOR<DeliveryReceiptUpdateWithoutSupplyOrderInput, DeliveryReceiptUncheckedUpdateWithoutSupplyOrderInput>
    create: XOR<DeliveryReceiptCreateWithoutSupplyOrderInput, DeliveryReceiptUncheckedCreateWithoutSupplyOrderInput>
  }

  export type DeliveryReceiptUpdateWithWhereUniqueWithoutSupplyOrderInput = {
    where: DeliveryReceiptWhereUniqueInput
    data: XOR<DeliveryReceiptUpdateWithoutSupplyOrderInput, DeliveryReceiptUncheckedUpdateWithoutSupplyOrderInput>
  }

  export type DeliveryReceiptUpdateManyWithWhereWithoutSupplyOrderInput = {
    where: DeliveryReceiptScalarWhereInput
    data: XOR<DeliveryReceiptUpdateManyMutationInput, DeliveryReceiptUncheckedUpdateManyWithoutSupplyOrderInput>
  }

  export type SupplyOrderCreateWithoutDeliveriesInput = {
    id?: string
    sp2bjNumber: string
    contractStartDate: Date | string
    contractEndDate: Date | string
    quantityOrdered: number
    budgetType: $Enums.SupplyBudgetType
    unitPrice: Decimal | DecimalJsLike | number | string
    freightCost: Decimal | DecimalJsLike | number | string
    totalCost: Decimal | DecimalJsLike | number | string
    ppnAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    garden: GardenCreateNestedOneWithoutSupplyOrdersInput
    fertilizerType: FertilizerTypeCreateNestedOneWithoutSupplyOrdersInput
    supplier: SupplierCreateNestedOneWithoutSupplyOrdersInput
    createdBy: UserCreateNestedOneWithoutCreatedSupplyInput
  }

  export type SupplyOrderUncheckedCreateWithoutDeliveriesInput = {
    id?: string
    gardenId: string
    fertilizerTypeId: string
    supplierId: string
    sp2bjNumber: string
    contractStartDate: Date | string
    contractEndDate: Date | string
    quantityOrdered: number
    budgetType: $Enums.SupplyBudgetType
    unitPrice: Decimal | DecimalJsLike | number | string
    freightCost: Decimal | DecimalJsLike | number | string
    totalCost: Decimal | DecimalJsLike | number | string
    ppnAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplyOrderCreateOrConnectWithoutDeliveriesInput = {
    where: SupplyOrderWhereUniqueInput
    create: XOR<SupplyOrderCreateWithoutDeliveriesInput, SupplyOrderUncheckedCreateWithoutDeliveriesInput>
  }

  export type UserCreateWithoutCreatedDeliveriesInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedGarden?: GardenCreateNestedOneWithoutAssignedUsersInput
    createdSupply?: SupplyOrderCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutCreatedDeliveriesInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    isActive?: boolean
    assignedGardenId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdSupply?: SupplyOrderUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutCreatedDeliveriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedDeliveriesInput, UserUncheckedCreateWithoutCreatedDeliveriesInput>
  }

  export type SupplyOrderUpsertWithoutDeliveriesInput = {
    update: XOR<SupplyOrderUpdateWithoutDeliveriesInput, SupplyOrderUncheckedUpdateWithoutDeliveriesInput>
    create: XOR<SupplyOrderCreateWithoutDeliveriesInput, SupplyOrderUncheckedCreateWithoutDeliveriesInput>
    where?: SupplyOrderWhereInput
  }

  export type SupplyOrderUpdateToOneWithWhereWithoutDeliveriesInput = {
    where?: SupplyOrderWhereInput
    data: XOR<SupplyOrderUpdateWithoutDeliveriesInput, SupplyOrderUncheckedUpdateWithoutDeliveriesInput>
  }

  export type SupplyOrderUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    sp2bjNumber?: StringFieldUpdateOperationsInput | string
    contractStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityOrdered?: IntFieldUpdateOperationsInput | number
    budgetType?: EnumSupplyBudgetTypeFieldUpdateOperationsInput | $Enums.SupplyBudgetType
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    freightCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ppnAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    garden?: GardenUpdateOneRequiredWithoutSupplyOrdersNestedInput
    fertilizerType?: FertilizerTypeUpdateOneRequiredWithoutSupplyOrdersNestedInput
    supplier?: SupplierUpdateOneRequiredWithoutSupplyOrdersNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedSupplyNestedInput
  }

  export type SupplyOrderUncheckedUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    gardenId?: StringFieldUpdateOperationsInput | string
    fertilizerTypeId?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    sp2bjNumber?: StringFieldUpdateOperationsInput | string
    contractStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityOrdered?: IntFieldUpdateOperationsInput | number
    budgetType?: EnumSupplyBudgetTypeFieldUpdateOperationsInput | $Enums.SupplyBudgetType
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    freightCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ppnAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutCreatedDeliveriesInput = {
    update: XOR<UserUpdateWithoutCreatedDeliveriesInput, UserUncheckedUpdateWithoutCreatedDeliveriesInput>
    create: XOR<UserCreateWithoutCreatedDeliveriesInput, UserUncheckedCreateWithoutCreatedDeliveriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedDeliveriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedDeliveriesInput, UserUncheckedUpdateWithoutCreatedDeliveriesInput>
  }

  export type UserUpdateWithoutCreatedDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedGarden?: GardenUpdateOneWithoutAssignedUsersNestedInput
    createdSupply?: SupplyOrderUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    assignedGardenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdSupply?: SupplyOrderUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type SupplyOrderCreateManyCreatedByInput = {
    id?: string
    gardenId: string
    fertilizerTypeId: string
    supplierId: string
    sp2bjNumber: string
    contractStartDate: Date | string
    contractEndDate: Date | string
    quantityOrdered: number
    budgetType: $Enums.SupplyBudgetType
    unitPrice: Decimal | DecimalJsLike | number | string
    freightCost: Decimal | DecimalJsLike | number | string
    totalCost: Decimal | DecimalJsLike | number | string
    ppnAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryReceiptCreateManyCreatedByInput = {
    id?: string
    supplyOrderId: string
    licensePlate: string
    receivedDate: Date | string
    quantityDelivered: number
    sackCount: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplyOrderUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    sp2bjNumber?: StringFieldUpdateOperationsInput | string
    contractStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityOrdered?: IntFieldUpdateOperationsInput | number
    budgetType?: EnumSupplyBudgetTypeFieldUpdateOperationsInput | $Enums.SupplyBudgetType
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    freightCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ppnAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    garden?: GardenUpdateOneRequiredWithoutSupplyOrdersNestedInput
    fertilizerType?: FertilizerTypeUpdateOneRequiredWithoutSupplyOrdersNestedInput
    supplier?: SupplierUpdateOneRequiredWithoutSupplyOrdersNestedInput
    deliveries?: DeliveryReceiptUpdateManyWithoutSupplyOrderNestedInput
  }

  export type SupplyOrderUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    gardenId?: StringFieldUpdateOperationsInput | string
    fertilizerTypeId?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    sp2bjNumber?: StringFieldUpdateOperationsInput | string
    contractStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityOrdered?: IntFieldUpdateOperationsInput | number
    budgetType?: EnumSupplyBudgetTypeFieldUpdateOperationsInput | $Enums.SupplyBudgetType
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    freightCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ppnAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: DeliveryReceiptUncheckedUpdateManyWithoutSupplyOrderNestedInput
  }

  export type SupplyOrderUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    gardenId?: StringFieldUpdateOperationsInput | string
    fertilizerTypeId?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    sp2bjNumber?: StringFieldUpdateOperationsInput | string
    contractStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityOrdered?: IntFieldUpdateOperationsInput | number
    budgetType?: EnumSupplyBudgetTypeFieldUpdateOperationsInput | $Enums.SupplyBudgetType
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    freightCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ppnAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryReceiptUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    receivedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityDelivered?: IntFieldUpdateOperationsInput | number
    sackCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplyOrder?: SupplyOrderUpdateOneRequiredWithoutDeliveriesNestedInput
  }

  export type DeliveryReceiptUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    supplyOrderId?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    receivedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityDelivered?: IntFieldUpdateOperationsInput | number
    sackCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryReceiptUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    supplyOrderId?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    receivedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityDelivered?: IntFieldUpdateOperationsInput | number
    sackCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplyOrderCreateManyGardenInput = {
    id?: string
    fertilizerTypeId: string
    supplierId: string
    sp2bjNumber: string
    contractStartDate: Date | string
    contractEndDate: Date | string
    quantityOrdered: number
    budgetType: $Enums.SupplyBudgetType
    unitPrice: Decimal | DecimalJsLike | number | string
    freightCost: Decimal | DecimalJsLike | number | string
    totalCost: Decimal | DecimalJsLike | number | string
    ppnAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateManyAssignedGardenInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplyOrderUpdateWithoutGardenInput = {
    id?: StringFieldUpdateOperationsInput | string
    sp2bjNumber?: StringFieldUpdateOperationsInput | string
    contractStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityOrdered?: IntFieldUpdateOperationsInput | number
    budgetType?: EnumSupplyBudgetTypeFieldUpdateOperationsInput | $Enums.SupplyBudgetType
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    freightCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ppnAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fertilizerType?: FertilizerTypeUpdateOneRequiredWithoutSupplyOrdersNestedInput
    supplier?: SupplierUpdateOneRequiredWithoutSupplyOrdersNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedSupplyNestedInput
    deliveries?: DeliveryReceiptUpdateManyWithoutSupplyOrderNestedInput
  }

  export type SupplyOrderUncheckedUpdateWithoutGardenInput = {
    id?: StringFieldUpdateOperationsInput | string
    fertilizerTypeId?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    sp2bjNumber?: StringFieldUpdateOperationsInput | string
    contractStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityOrdered?: IntFieldUpdateOperationsInput | number
    budgetType?: EnumSupplyBudgetTypeFieldUpdateOperationsInput | $Enums.SupplyBudgetType
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    freightCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ppnAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: DeliveryReceiptUncheckedUpdateManyWithoutSupplyOrderNestedInput
  }

  export type SupplyOrderUncheckedUpdateManyWithoutGardenInput = {
    id?: StringFieldUpdateOperationsInput | string
    fertilizerTypeId?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    sp2bjNumber?: StringFieldUpdateOperationsInput | string
    contractStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityOrdered?: IntFieldUpdateOperationsInput | number
    budgetType?: EnumSupplyBudgetTypeFieldUpdateOperationsInput | $Enums.SupplyBudgetType
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    freightCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ppnAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpdateWithoutAssignedGardenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdSupply?: SupplyOrderUpdateManyWithoutCreatedByNestedInput
    createdDeliveries?: DeliveryReceiptUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutAssignedGardenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdSupply?: SupplyOrderUncheckedUpdateManyWithoutCreatedByNestedInput
    createdDeliveries?: DeliveryReceiptUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateManyWithoutAssignedGardenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplyOrderCreateManyFertilizerTypeInput = {
    id?: string
    gardenId: string
    supplierId: string
    sp2bjNumber: string
    contractStartDate: Date | string
    contractEndDate: Date | string
    quantityOrdered: number
    budgetType: $Enums.SupplyBudgetType
    unitPrice: Decimal | DecimalJsLike | number | string
    freightCost: Decimal | DecimalJsLike | number | string
    totalCost: Decimal | DecimalJsLike | number | string
    ppnAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplyOrderUpdateWithoutFertilizerTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    sp2bjNumber?: StringFieldUpdateOperationsInput | string
    contractStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityOrdered?: IntFieldUpdateOperationsInput | number
    budgetType?: EnumSupplyBudgetTypeFieldUpdateOperationsInput | $Enums.SupplyBudgetType
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    freightCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ppnAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    garden?: GardenUpdateOneRequiredWithoutSupplyOrdersNestedInput
    supplier?: SupplierUpdateOneRequiredWithoutSupplyOrdersNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedSupplyNestedInput
    deliveries?: DeliveryReceiptUpdateManyWithoutSupplyOrderNestedInput
  }

  export type SupplyOrderUncheckedUpdateWithoutFertilizerTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    gardenId?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    sp2bjNumber?: StringFieldUpdateOperationsInput | string
    contractStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityOrdered?: IntFieldUpdateOperationsInput | number
    budgetType?: EnumSupplyBudgetTypeFieldUpdateOperationsInput | $Enums.SupplyBudgetType
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    freightCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ppnAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: DeliveryReceiptUncheckedUpdateManyWithoutSupplyOrderNestedInput
  }

  export type SupplyOrderUncheckedUpdateManyWithoutFertilizerTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    gardenId?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    sp2bjNumber?: StringFieldUpdateOperationsInput | string
    contractStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityOrdered?: IntFieldUpdateOperationsInput | number
    budgetType?: EnumSupplyBudgetTypeFieldUpdateOperationsInput | $Enums.SupplyBudgetType
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    freightCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ppnAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplyOrderCreateManySupplierInput = {
    id?: string
    gardenId: string
    fertilizerTypeId: string
    sp2bjNumber: string
    contractStartDate: Date | string
    contractEndDate: Date | string
    quantityOrdered: number
    budgetType: $Enums.SupplyBudgetType
    unitPrice: Decimal | DecimalJsLike | number | string
    freightCost: Decimal | DecimalJsLike | number | string
    totalCost: Decimal | DecimalJsLike | number | string
    ppnAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplyOrderUpdateWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    sp2bjNumber?: StringFieldUpdateOperationsInput | string
    contractStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityOrdered?: IntFieldUpdateOperationsInput | number
    budgetType?: EnumSupplyBudgetTypeFieldUpdateOperationsInput | $Enums.SupplyBudgetType
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    freightCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ppnAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    garden?: GardenUpdateOneRequiredWithoutSupplyOrdersNestedInput
    fertilizerType?: FertilizerTypeUpdateOneRequiredWithoutSupplyOrdersNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedSupplyNestedInput
    deliveries?: DeliveryReceiptUpdateManyWithoutSupplyOrderNestedInput
  }

  export type SupplyOrderUncheckedUpdateWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    gardenId?: StringFieldUpdateOperationsInput | string
    fertilizerTypeId?: StringFieldUpdateOperationsInput | string
    sp2bjNumber?: StringFieldUpdateOperationsInput | string
    contractStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityOrdered?: IntFieldUpdateOperationsInput | number
    budgetType?: EnumSupplyBudgetTypeFieldUpdateOperationsInput | $Enums.SupplyBudgetType
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    freightCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ppnAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: DeliveryReceiptUncheckedUpdateManyWithoutSupplyOrderNestedInput
  }

  export type SupplyOrderUncheckedUpdateManyWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    gardenId?: StringFieldUpdateOperationsInput | string
    fertilizerTypeId?: StringFieldUpdateOperationsInput | string
    sp2bjNumber?: StringFieldUpdateOperationsInput | string
    contractStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityOrdered?: IntFieldUpdateOperationsInput | number
    budgetType?: EnumSupplyBudgetTypeFieldUpdateOperationsInput | $Enums.SupplyBudgetType
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    freightCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ppnAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryReceiptCreateManySupplyOrderInput = {
    id?: string
    licensePlate: string
    receivedDate: Date | string
    quantityDelivered: number
    sackCount: number
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryReceiptUpdateWithoutSupplyOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    receivedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityDelivered?: IntFieldUpdateOperationsInput | number
    sackCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedDeliveriesNestedInput
  }

  export type DeliveryReceiptUncheckedUpdateWithoutSupplyOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    receivedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityDelivered?: IntFieldUpdateOperationsInput | number
    sackCount?: IntFieldUpdateOperationsInput | number
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryReceiptUncheckedUpdateManyWithoutSupplyOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    receivedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantityDelivered?: IntFieldUpdateOperationsInput | number
    sackCount?: IntFieldUpdateOperationsInput | number
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}