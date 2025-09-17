type Nullable<T> = T | null | undefined
declare function KtSingleton<T>(): T & (abstract new() => any);
export declare interface KtList<E> /* extends Collection<E> */ {
    asJsReadonlyArrayView(): ReadonlyArray<E>;
    readonly __doNotUseOrImplementIt: {
        readonly "kotlin.collections.KtList": unique symbol;
    };
}
export declare abstract class KtList<E> extends KtSingleton<KtList.$metadata$.constructor>() {
    private constructor();
}
/** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
export declare namespace KtList.$metadata$ {
    abstract class constructor {
        fromJsArray<E>(array: ReadonlyArray<E>): KtList<E>;
        private constructor();
    }
}
export declare abstract class Kson {
    static readonly getInstance: () => typeof Kson.$metadata$.type;
    private constructor();
}
/** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
export declare namespace Kson.$metadata$ {
    abstract class type extends KtSingleton<constructor>() {
        private constructor();
    }
    abstract class constructor {
        format(kson: string, formatOptions?: FormatOptions): string;
        toJson(kson: string, retainEmbedTags?: boolean): Result;
        toYaml(kson: string, retainEmbedTags?: boolean): Result;
        analyze(kson: string): Analysis;
        parseSchema(schemaKson: string): SchemaResult;
        private constructor();
    }
}
export declare abstract class Result {
    protected constructor();
}
/** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
export declare namespace Result.$metadata$ {
    const constructor: abstract new () => Result;
}
export declare namespace Result {
    class Success extends Result.$metadata$.constructor {
        constructor(output: string);
        get output(): string;
        copy(output?: string): Result.Success;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
    namespace Success.$metadata$ {
        const constructor: abstract new () => Success;
    }
    class Failure extends Result.$metadata$.constructor {
        constructor(errors: KtList<Message>);
        get errors(): KtList<Message>;
        copy(errors?: KtList<Message>): Result.Failure;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
    namespace Failure.$metadata$ {
        const constructor: abstract new () => Failure;
    }
}
export declare abstract class SchemaResult {
    protected constructor();
}
/** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
export declare namespace SchemaResult.$metadata$ {
    const constructor: abstract new () => SchemaResult;
}
export declare namespace SchemaResult {
    class Success extends SchemaResult.$metadata$.constructor {
        constructor(schemaValidator: SchemaValidator);
        get schemaValidator(): SchemaValidator;
        copy(schemaValidator?: SchemaValidator): SchemaResult.Success;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
    namespace Success.$metadata$ {
        const constructor: abstract new () => Success;
    }
    class Failure extends SchemaResult.$metadata$.constructor {
        constructor(errors: KtList<Message>);
        get errors(): KtList<Message>;
        copy(errors?: KtList<Message>): SchemaResult.Failure;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
    namespace Failure.$metadata$ {
        const constructor: abstract new () => Failure;
    }
}
export declare class SchemaValidator {
    private constructor();
    validate(kson: string): KtList<Message>;
}
/** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
export declare namespace SchemaValidator.$metadata$ {
    const constructor: abstract new () => SchemaValidator;
}
export declare class FormatOptions {
    constructor(indentType?: IndentType, formattingStyle?: FormattingStyle);
    get indentType(): IndentType;
    get formattingStyle(): FormattingStyle;
    copy(indentType?: IndentType, formattingStyle?: FormattingStyle): FormatOptions;
    toString(): string;
    hashCode(): number;
    equals(other: Nullable<any>): boolean;
}
/** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
export declare namespace FormatOptions.$metadata$ {
    const constructor: abstract new () => FormatOptions;
}
export declare abstract class FormattingStyle {
    private constructor();
    static get PLAIN(): FormattingStyle & {
        get name(): "PLAIN";
        get ordinal(): 0;
    };
    static get DELIMITED(): FormattingStyle & {
        get name(): "DELIMITED";
        get ordinal(): 1;
    };
    static get COMPACT(): FormattingStyle & {
        get name(): "COMPACT";
        get ordinal(): 2;
    };
    get name(): "PLAIN" | "DELIMITED" | "COMPACT";
    get ordinal(): 0 | 1 | 2;
    static values(): Array<FormattingStyle>;
    static valueOf(value: string): FormattingStyle;
}
/** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
export declare namespace FormattingStyle.$metadata$ {
    const constructor: abstract new () => FormattingStyle;
}
export declare abstract class IndentType {
    protected constructor();
}
/** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
export declare namespace IndentType.$metadata$ {
    const constructor: abstract new () => IndentType;
}
export declare namespace IndentType {
    class Spaces extends IndentType.$metadata$.constructor {
        constructor(size?: number);
        get size(): number;
        copy(size?: number): IndentType.Spaces;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
    namespace Spaces.$metadata$ {
        const constructor: abstract new () => Spaces;
    }
    abstract class Tabs extends KtSingleton<Tabs.$metadata$.constructor>() {
        private constructor();
    }
    /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
    namespace Tabs.$metadata$ {
        abstract class constructor extends IndentType.$metadata$.constructor {
            toString(): string;
            hashCode(): number;
            equals(other: Nullable<any>): boolean;
            private constructor();
        }
    }
}
export declare class Analysis {
    private constructor();
    get errors(): KtList<Message>;
    get tokens(): KtList<Token>;
    copy$default(errors?: KtList<Message>, tokens?: KtList<Token>): Analysis;
    toString(): string;
    hashCode(): number;
    equals(other: Nullable<any>): boolean;
}
/** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
export declare namespace Analysis.$metadata$ {
    const constructor: abstract new () => Analysis;
}
export declare class Token {
    private constructor();
    get tokenType(): TokenType;
    get text(): string;
    get start(): Position;
    get end(): Position;
    copy$default(tokenType?: TokenType, text?: string, start?: Position, end?: Position): Token;
    toString(): string;
    hashCode(): number;
    equals(other: Nullable<any>): boolean;
}
/** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
export declare namespace Token.$metadata$ {
    const constructor: abstract new () => Token;
}
export declare abstract class TokenType {
    private constructor();
    static get CURLY_BRACE_L(): TokenType & {
        get name(): "CURLY_BRACE_L";
        get ordinal(): 0;
    };
    static get CURLY_BRACE_R(): TokenType & {
        get name(): "CURLY_BRACE_R";
        get ordinal(): 1;
    };
    static get SQUARE_BRACKET_L(): TokenType & {
        get name(): "SQUARE_BRACKET_L";
        get ordinal(): 2;
    };
    static get SQUARE_BRACKET_R(): TokenType & {
        get name(): "SQUARE_BRACKET_R";
        get ordinal(): 3;
    };
    static get ANGLE_BRACKET_L(): TokenType & {
        get name(): "ANGLE_BRACKET_L";
        get ordinal(): 4;
    };
    static get ANGLE_BRACKET_R(): TokenType & {
        get name(): "ANGLE_BRACKET_R";
        get ordinal(): 5;
    };
    static get COLON(): TokenType & {
        get name(): "COLON";
        get ordinal(): 6;
    };
    static get DOT(): TokenType & {
        get name(): "DOT";
        get ordinal(): 7;
    };
    static get END_DASH(): TokenType & {
        get name(): "END_DASH";
        get ordinal(): 8;
    };
    static get COMMA(): TokenType & {
        get name(): "COMMA";
        get ordinal(): 9;
    };
    static get COMMENT(): TokenType & {
        get name(): "COMMENT";
        get ordinal(): 10;
    };
    static get EMBED_OPEN_DELIM(): TokenType & {
        get name(): "EMBED_OPEN_DELIM";
        get ordinal(): 11;
    };
    static get EMBED_CLOSE_DELIM(): TokenType & {
        get name(): "EMBED_CLOSE_DELIM";
        get ordinal(): 12;
    };
    static get EMBED_TAG(): TokenType & {
        get name(): "EMBED_TAG";
        get ordinal(): 13;
    };
    static get EMBED_TAG_STOP(): TokenType & {
        get name(): "EMBED_TAG_STOP";
        get ordinal(): 14;
    };
    static get EMBED_METADATA(): TokenType & {
        get name(): "EMBED_METADATA";
        get ordinal(): 15;
    };
    static get EMBED_PREAMBLE_NEWLINE(): TokenType & {
        get name(): "EMBED_PREAMBLE_NEWLINE";
        get ordinal(): 16;
    };
    static get EMBED_CONTENT(): TokenType & {
        get name(): "EMBED_CONTENT";
        get ordinal(): 17;
    };
    static get FALSE(): TokenType & {
        get name(): "FALSE";
        get ordinal(): 18;
    };
    static get UNQUOTED_STRING(): TokenType & {
        get name(): "UNQUOTED_STRING";
        get ordinal(): 19;
    };
    static get ILLEGAL_CHAR(): TokenType & {
        get name(): "ILLEGAL_CHAR";
        get ordinal(): 20;
    };
    static get LIST_DASH(): TokenType & {
        get name(): "LIST_DASH";
        get ordinal(): 21;
    };
    static get NULL(): TokenType & {
        get name(): "NULL";
        get ordinal(): 22;
    };
    static get NUMBER(): TokenType & {
        get name(): "NUMBER";
        get ordinal(): 23;
    };
    static get STRING_OPEN_QUOTE(): TokenType & {
        get name(): "STRING_OPEN_QUOTE";
        get ordinal(): 24;
    };
    static get STRING_CLOSE_QUOTE(): TokenType & {
        get name(): "STRING_CLOSE_QUOTE";
        get ordinal(): 25;
    };
    static get STRING_CONTENT(): TokenType & {
        get name(): "STRING_CONTENT";
        get ordinal(): 26;
    };
    static get TRUE(): TokenType & {
        get name(): "TRUE";
        get ordinal(): 27;
    };
    static get WHITESPACE(): TokenType & {
        get name(): "WHITESPACE";
        get ordinal(): 28;
    };
    static get EOF(): TokenType & {
        get name(): "EOF";
        get ordinal(): 29;
    };
    get name(): "CURLY_BRACE_L" | "CURLY_BRACE_R" | "SQUARE_BRACKET_L" | "SQUARE_BRACKET_R" | "ANGLE_BRACKET_L" | "ANGLE_BRACKET_R" | "COLON" | "DOT" | "END_DASH" | "COMMA" | "COMMENT" | "EMBED_OPEN_DELIM" | "EMBED_CLOSE_DELIM" | "EMBED_TAG" | "EMBED_TAG_STOP" | "EMBED_METADATA" | "EMBED_PREAMBLE_NEWLINE" | "EMBED_CONTENT" | "FALSE" | "UNQUOTED_STRING" | "ILLEGAL_CHAR" | "LIST_DASH" | "NULL" | "NUMBER" | "STRING_OPEN_QUOTE" | "STRING_CLOSE_QUOTE" | "STRING_CONTENT" | "TRUE" | "WHITESPACE" | "EOF";
    get ordinal(): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29;
    static values(): Array<TokenType>;
    static valueOf(value: string): TokenType;
}
/** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
export declare namespace TokenType.$metadata$ {
    const constructor: abstract new () => TokenType;
}
export declare class Message {
    private constructor();
    get message(): string;
    get severity(): MessageSeverity;
    get start(): Position;
    get end(): Position;
    copy$default(message?: string, severity?: MessageSeverity, start?: Position, end?: Position): Message;
    toString(): string;
    hashCode(): number;
    equals(other: Nullable<any>): boolean;
}
/** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
export declare namespace Message.$metadata$ {
    const constructor: abstract new () => Message;
}
export declare abstract class MessageSeverity {
    private constructor();
    static get ERROR(): MessageSeverity & {
        get name(): "ERROR";
        get ordinal(): 0;
    };
    static get WARNING(): MessageSeverity & {
        get name(): "WARNING";
        get ordinal(): 1;
    };
    get name(): "ERROR" | "WARNING";
    get ordinal(): 0 | 1;
    static values(): Array<MessageSeverity>;
    static valueOf(value: string): MessageSeverity;
}
/** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
export declare namespace MessageSeverity.$metadata$ {
    const constructor: abstract new () => MessageSeverity;
}
export declare class Position {
    private constructor();
    get line(): number;
    get column(): number;
}
/** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
export declare namespace Position.$metadata$ {
    const constructor: abstract new () => Position;
}
export declare abstract class SimpleListIterator {
    protected constructor(list: KtList<any>);
    next(): Nullable<any>;
}
/** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
export declare namespace SimpleListIterator.$metadata$ {
    const constructor: abstract new () => SimpleListIterator;
}
export declare abstract class EnumHelper {
    static readonly getInstance: () => typeof EnumHelper.$metadata$.type;
    private constructor();
}
/** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
export declare namespace EnumHelper.$metadata$ {
    abstract class type extends KtSingleton<constructor>() {
        private constructor();
    }
    abstract class constructor {
        name(value: any/* Enum<UnknownType *> */): string;
        ordinal(value: any/* Enum<UnknownType *> */): number;
        private constructor();
    }
}