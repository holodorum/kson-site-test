import {
  formatdh4c2cq69equ as format,
  Jsonbo01x3rorusw as Json,
  KsonCore_instanceplwut2zkrgoj as KsonCore_instance,
  Yaml30ujyqvxwikl0 as Yaml,
  MessageSinkj7ye2aom2rfb as MessageSink,
  Tab2izi0q03hjzax as Tab,
  Space3pfh0f6t4nb8i as Space,
  FormattingStyle_PLAIN_getInstance1gnzah0fqv9t9 as FormattingStyle_PLAIN_getInstance,
  FormattingStyle_DELIMITED_getInstance29gtdf69y3vrd as FormattingStyle_DELIMITED_getInstance,
  FormattingStyle_COMPACT_getInstance22kabdqvn5lhp as FormattingStyle_COMPACT_getInstance,
  KsonFormatterConfig1q1z8kxj34grd as KsonFormatterConfig,
  TokenType_STRING_CLOSE_QUOTE_getInstancegkt54mqbjj39 as TokenType_STRING_CLOSE_QUOTE_getInstance,
  TokenType_EOF_getInstance2rp5h1rnlmzhw as TokenType_EOF_getInstance,
} from './kson.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  VOID3gxj6tk5isa35 as VOID,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
  collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault,
  ArrayList_init_$Create$3bxttkj3v1mea as ArrayList_init_$Create$,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
  Unit_instance1fbcbse1fwigr as Unit_instance,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  THROW_IAE23kobfj9wdoxr as THROW_IAE,
  Enum3alwj03lh1n41 as Enum,
  defineProp3hxgpk2knu2px as defineProp,
  objectCreate1ve4bgxiu4x98 as objectCreate,
  ArrayList_init_$Create$149jv2ovkkvnt as ArrayList_init_$Create$_0,
  StringBuilder_init_$Create$2qsge4ydj6bin as StringBuilder_init_$Create$,
  setOf45ia9pnfhe90 as setOf,
  charSequenceLength3278n89t01tmv as charSequenceLength,
  IllegalStateException_init_$Create$2w9444nebyjns as IllegalStateException_init_$Create$,
} from './kotlin-kotlin-stdlib.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
initMetadataForObject(Kson_0, 'Kson');
initMetadataForClass(Result, 'Result');
initMetadataForClass(Success, 'Success', VOID, Result);
initMetadataForClass(Failure, 'Failure', VOID, Result);
initMetadataForClass(SchemaResult, 'SchemaResult');
initMetadataForClass(Success_0, 'Success', VOID, SchemaResult);
initMetadataForClass(Failure_0, 'Failure', VOID, SchemaResult);
initMetadataForClass(SchemaValidator, 'SchemaValidator');
initMetadataForClass(FormatOptions, 'FormatOptions', FormatOptions);
initMetadataForClass(FormattingStyle, 'FormattingStyle', VOID, Enum);
initMetadataForClass(IndentType, 'IndentType');
initMetadataForClass(Spaces, 'Spaces', Spaces, IndentType);
initMetadataForObject(Tabs, 'Tabs', VOID, IndentType);
initMetadataForClass(Analysis, 'Analysis');
initMetadataForClass(Token, 'Token');
initMetadataForClass(TokenType, 'TokenType', VOID, Enum);
initMetadataForClass(Message, 'Message');
initMetadataForClass(MessageSeverity, 'MessageSeverity', VOID, Enum);
initMetadataForClass(Position, 'Position');
initMetadataForClass(SimpleListIterator, 'SimpleListIterator');
initMetadataForObject(EnumHelper_0, 'EnumHelper');
//endregion
function Kson_0() {
}
protoOf(Kson_0).a10 = function (kson, formatOptions) {
  return format(kson, formatOptions.b10());
};
protoOf(Kson_0).format = function (kson, formatOptions, $super) {
  formatOptions = formatOptions === VOID ? new FormatOptions() : formatOptions;
  return $super === VOID ? this.a10(kson, formatOptions) : $super.a10.call(this, kson, formatOptions);
};
protoOf(Kson_0).c10 = function (kson, retainEmbedTags) {
  var compileConfig = new Json(retainEmbedTags);
  var jsonParseResult = KsonCore_instance.uf(kson, compileConfig);
  var tmp;
  if (jsonParseResult.he()) {
    tmp = new Failure(this.d10(jsonParseResult.ge()));
  } else {
    tmp = new Success(ensureNotNull(jsonParseResult.zd_1));
  }
  return tmp;
};
protoOf(Kson_0).toJson = function (kson, retainEmbedTags, $super) {
  retainEmbedTags = retainEmbedTags === VOID ? true : retainEmbedTags;
  return $super === VOID ? this.c10(kson, retainEmbedTags) : $super.c10.call(this, kson, retainEmbedTags);
};
protoOf(Kson_0).e10 = function (kson, retainEmbedTags) {
  var compileConfig = new Yaml(VOID, retainEmbedTags);
  var yamlParseResult = KsonCore_instance.tf(kson, compileConfig);
  var tmp;
  if (yamlParseResult.he()) {
    tmp = new Failure(this.d10(yamlParseResult.ge()));
  } else {
    tmp = new Success(ensureNotNull(yamlParseResult.wf_1));
  }
  return tmp;
};
protoOf(Kson_0).toYaml = function (kson, retainEmbedTags, $super) {
  retainEmbedTags = retainEmbedTags === VOID ? true : retainEmbedTags;
  return $super === VOID ? this.e10(kson, retainEmbedTags) : $super.e10.call(this, kson, retainEmbedTags);
};
protoOf(Kson_0).analyze = function (kson) {
  var parseResult = KsonCore_instance.of(kson);
  var tokens = convertTokens(parseResult.be_1);
  var messages = this.d10(parseResult.de_1);
  return new Analysis(messages, tokens);
};
protoOf(Kson_0).parseSchema = function (schemaKson) {
  var schemaParseResult = KsonCore_instance.pf(schemaKson);
  var messages = this.d10(schemaParseResult.yf_1);
  var tmp0_elvis_lhs = schemaParseResult.xf_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return new Failure_0(messages);
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var jsonSchema = tmp;
  // Inline function 'kotlin.collections.isNotEmpty' call
  if (!messages.n()) {
    return new Failure_0(messages);
  }
  return new Success_0(new SchemaValidator(jsonSchema));
};
protoOf(Kson_0).d10 = function (loggedMessages) {
  // Inline function 'kotlin.collections.map' call
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList_init_$Create$(collectionSizeOrDefault(loggedMessages, 10));
  var _iterator__ex2g4s = loggedMessages.f();
  while (_iterator__ex2g4s.g()) {
    var item = _iterator__ex2g4s.h();
    var tmp;
    switch (item.dn_1.en().ze_1.v1_1) {
      case 0:
        tmp = MessageSeverity_ERROR_getInstance();
        break;
      case 1:
        tmp = MessageSeverity_WARNING_getInstance();
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    var severity = tmp;
    var tmp$ret$0 = new Message(item.dn_1.toString(), severity, Position_init_$Create$(item.cn_1.yl_1), Position_init_$Create$(item.cn_1.zl_1));
    destination.d(tmp$ret$0);
  }
  return destination;
};
var Kson_instance;
function Kson_getInstance() {
  return Kson_instance;
}
function Success(output) {
  Result.call(this);
  this.output = output;
}
protoOf(Success).f10 = function () {
  return this.output;
};
protoOf(Success).hb = function () {
  return this.output;
};
protoOf(Success).g10 = function (output) {
  return new Success(output);
};
protoOf(Success).copy = function (output, $super) {
  output = output === VOID ? this.output : output;
  return $super === VOID ? this.g10(output) : $super.g10.call(this, output);
};
protoOf(Success).toString = function () {
  return 'Success(output=' + this.output + ')';
};
protoOf(Success).hashCode = function () {
  return getStringHashCode(this.output);
};
protoOf(Success).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Success))
    return false;
  var tmp0_other_with_cast = other instanceof Success ? other : THROW_CCE();
  if (!(this.output === tmp0_other_with_cast.output))
    return false;
  return true;
};
function Failure(errors) {
  Result.call(this);
  this.errors = errors;
}
protoOf(Failure).h10 = function () {
  return this.errors;
};
protoOf(Failure).hb = function () {
  return this.errors;
};
protoOf(Failure).i10 = function (errors) {
  return new Failure(errors);
};
protoOf(Failure).copy = function (errors, $super) {
  errors = errors === VOID ? this.errors : errors;
  return $super === VOID ? this.i10(errors) : $super.i10.call(this, errors);
};
protoOf(Failure).toString = function () {
  return 'Failure(errors=' + toString(this.errors) + ')';
};
protoOf(Failure).hashCode = function () {
  return hashCode(this.errors);
};
protoOf(Failure).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Failure))
    return false;
  var tmp0_other_with_cast = other instanceof Failure ? other : THROW_CCE();
  if (!equals(this.errors, tmp0_other_with_cast.errors))
    return false;
  return true;
};
function Result() {
}
function Success_0(schemaValidator) {
  SchemaResult.call(this);
  this.schemaValidator = schemaValidator;
}
protoOf(Success_0).j10 = function () {
  return this.schemaValidator;
};
protoOf(Success_0).hb = function () {
  return this.schemaValidator;
};
protoOf(Success_0).k10 = function (schemaValidator) {
  return new Success_0(schemaValidator);
};
protoOf(Success_0).copy = function (schemaValidator, $super) {
  schemaValidator = schemaValidator === VOID ? this.schemaValidator : schemaValidator;
  return $super === VOID ? this.k10(schemaValidator) : $super.k10.call(this, schemaValidator);
};
protoOf(Success_0).toString = function () {
  return 'Success(schemaValidator=' + toString(this.schemaValidator) + ')';
};
protoOf(Success_0).hashCode = function () {
  return hashCode(this.schemaValidator);
};
protoOf(Success_0).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Success_0))
    return false;
  var tmp0_other_with_cast = other instanceof Success_0 ? other : THROW_CCE();
  if (!equals(this.schemaValidator, tmp0_other_with_cast.schemaValidator))
    return false;
  return true;
};
function Failure_0(errors) {
  SchemaResult.call(this);
  this.errors = errors;
}
protoOf(Failure_0).h10 = function () {
  return this.errors;
};
protoOf(Failure_0).hb = function () {
  return this.errors;
};
protoOf(Failure_0).i10 = function (errors) {
  return new Failure_0(errors);
};
protoOf(Failure_0).copy = function (errors, $super) {
  errors = errors === VOID ? this.errors : errors;
  return $super === VOID ? this.i10(errors) : $super.i10.call(this, errors);
};
protoOf(Failure_0).toString = function () {
  return 'Failure(errors=' + toString(this.errors) + ')';
};
protoOf(Failure_0).hashCode = function () {
  return hashCode(this.errors);
};
protoOf(Failure_0).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Failure_0))
    return false;
  var tmp0_other_with_cast = other instanceof Failure_0 ? other : THROW_CCE();
  if (!equals(this.errors, tmp0_other_with_cast.errors))
    return false;
  return true;
};
function SchemaResult() {
}
function SchemaValidator(schema) {
  this.l10_1 = schema;
}
protoOf(SchemaValidator).validate = function (kson) {
  var astParseResult = KsonCore_instance.of(kson);
  if (astParseResult.he()) {
    return Kson_instance.d10(astParseResult.de_1);
  }
  var messageSink = new MessageSink();
  var ksonValue = astParseResult.qf();
  if (!(ksonValue == null)) {
    this.l10_1.nf(ksonValue, messageSink);
  }
  return Kson_instance.d10(messageSink.sf());
};
function FormatOptions(indentType, formattingStyle) {
  indentType = indentType === VOID ? new Spaces(2) : indentType;
  formattingStyle = formattingStyle === VOID ? FormattingStyle_PLAIN_getInstance_0() : formattingStyle;
  this.indentType = indentType;
  this.formattingStyle = formattingStyle;
}
protoOf(FormatOptions).m10 = function () {
  return this.indentType;
};
protoOf(FormatOptions).n10 = function () {
  return this.formattingStyle;
};
protoOf(FormatOptions).b10 = function () {
  var tmp0_subject = this.indentType;
  var tmp;
  if (tmp0_subject instanceof Spaces) {
    tmp = new Space(this.indentType.size);
  } else {
    if (tmp0_subject instanceof Tabs) {
      tmp = new Tab();
    } else {
      noWhenBranchMatchedException();
    }
  }
  var indentType = tmp;
  var tmp_0;
  switch (this.formattingStyle.v1_1) {
    case 0:
      tmp_0 = FormattingStyle_PLAIN_getInstance();
      break;
    case 1:
      tmp_0 = FormattingStyle_DELIMITED_getInstance();
      break;
    case 2:
      tmp_0 = FormattingStyle_COMPACT_getInstance();
      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  var formattingStyle = tmp_0;
  return new KsonFormatterConfig(indentType, formattingStyle);
};
protoOf(FormatOptions).hb = function () {
  return this.indentType;
};
protoOf(FormatOptions).ib = function () {
  return this.formattingStyle;
};
protoOf(FormatOptions).o10 = function (indentType, formattingStyle) {
  return new FormatOptions(indentType, formattingStyle);
};
protoOf(FormatOptions).copy = function (indentType, formattingStyle, $super) {
  indentType = indentType === VOID ? this.indentType : indentType;
  formattingStyle = formattingStyle === VOID ? this.formattingStyle : formattingStyle;
  return $super === VOID ? this.o10(indentType, formattingStyle) : $super.o10.call(this, indentType, formattingStyle);
};
protoOf(FormatOptions).toString = function () {
  return 'FormatOptions(indentType=' + toString(this.indentType) + ', formattingStyle=' + this.formattingStyle.toString() + ')';
};
protoOf(FormatOptions).hashCode = function () {
  var result = hashCode(this.indentType);
  result = imul(result, 31) + this.formattingStyle.hashCode() | 0;
  return result;
};
protoOf(FormatOptions).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof FormatOptions))
    return false;
  var tmp0_other_with_cast = other instanceof FormatOptions ? other : THROW_CCE();
  if (!equals(this.indentType, tmp0_other_with_cast.indentType))
    return false;
  if (!this.formattingStyle.equals(tmp0_other_with_cast.formattingStyle))
    return false;
  return true;
};
var FormattingStyle_PLAIN_instance;
var FormattingStyle_DELIMITED_instance;
var FormattingStyle_COMPACT_instance;
function values() {
  return [FormattingStyle_PLAIN_getInstance_0(), FormattingStyle_DELIMITED_getInstance_0(), FormattingStyle_COMPACT_getInstance_0()];
}
function valueOf(value) {
  switch (value) {
    case 'PLAIN':
      return FormattingStyle_PLAIN_getInstance_0();
    case 'DELIMITED':
      return FormattingStyle_DELIMITED_getInstance_0();
    case 'COMPACT':
      return FormattingStyle_COMPACT_getInstance_0();
    default:
      FormattingStyle_initEntries();
      THROW_IAE('No enum constant value.');
      break;
  }
}
var FormattingStyle_entriesInitialized;
function FormattingStyle_initEntries() {
  if (FormattingStyle_entriesInitialized)
    return Unit_instance;
  FormattingStyle_entriesInitialized = true;
  FormattingStyle_PLAIN_instance = new FormattingStyle('PLAIN', 0);
  FormattingStyle_DELIMITED_instance = new FormattingStyle('DELIMITED', 1);
  FormattingStyle_COMPACT_instance = new FormattingStyle('COMPACT', 2);
}
function FormattingStyle(name, ordinal) {
  Enum.call(this, name, ordinal);
}
function Spaces(size) {
  size = size === VOID ? 2 : size;
  IndentType.call(this);
  this.size = size;
}
protoOf(Spaces).l = function () {
  return this.size;
};
protoOf(Spaces).hb = function () {
  return this.size;
};
protoOf(Spaces).r10 = function (size) {
  return new Spaces(size);
};
protoOf(Spaces).copy = function (size, $super) {
  size = size === VOID ? this.size : size;
  return $super === VOID ? this.r10(size) : $super.r10.call(this, size);
};
protoOf(Spaces).toString = function () {
  return 'Spaces(size=' + this.size + ')';
};
protoOf(Spaces).hashCode = function () {
  return this.size;
};
protoOf(Spaces).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Spaces))
    return false;
  var tmp0_other_with_cast = other instanceof Spaces ? other : THROW_CCE();
  if (!(this.size === tmp0_other_with_cast.size))
    return false;
  return true;
};
function Tabs() {
  Tabs_instance = this;
  IndentType.call(this);
}
protoOf(Tabs).toString = function () {
  return 'Tabs';
};
protoOf(Tabs).hashCode = function () {
  return 1929700489;
};
protoOf(Tabs).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Tabs))
    return false;
  other instanceof Tabs || THROW_CCE();
  return true;
};
var Tabs_instance;
function Tabs_getInstance() {
  if (Tabs_instance == null)
    new Tabs();
  return Tabs_instance;
}
function IndentType() {
}
function Analysis(errors, tokens) {
  this.errors = errors;
  this.tokens = tokens;
}
protoOf(Analysis).h10 = function () {
  return this.errors;
};
protoOf(Analysis).s10 = function () {
  return this.tokens;
};
protoOf(Analysis).hb = function () {
  return this.errors;
};
protoOf(Analysis).ib = function () {
  return this.tokens;
};
protoOf(Analysis).t10 = function (errors, tokens) {
  return new Analysis(errors, tokens);
};
protoOf(Analysis).copy$default = function (errors, tokens, $super) {
  errors = errors === VOID ? this.errors : errors;
  tokens = tokens === VOID ? this.tokens : tokens;
  return $super === VOID ? this.t10(errors, tokens) : $super.t10.call(this, errors, tokens);
};
protoOf(Analysis).toString = function () {
  return 'Analysis(errors=' + toString(this.errors) + ', tokens=' + toString(this.tokens) + ')';
};
protoOf(Analysis).hashCode = function () {
  var result = hashCode(this.errors);
  result = imul(result, 31) + hashCode(this.tokens) | 0;
  return result;
};
protoOf(Analysis).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Analysis))
    return false;
  var tmp0_other_with_cast = other instanceof Analysis ? other : THROW_CCE();
  if (!equals(this.errors, tmp0_other_with_cast.errors))
    return false;
  if (!equals(this.tokens, tmp0_other_with_cast.tokens))
    return false;
  return true;
};
function Token(tokenType, text, start, end) {
  this.tokenType = tokenType;
  this.text = text;
  this.start = start;
  this.end = end;
}
protoOf(Token).u10 = function () {
  return this.tokenType;
};
protoOf(Token).v10 = function () {
  return this.text;
};
protoOf(Token).v9 = function () {
  return this.start;
};
protoOf(Token).w10 = function () {
  return this.end;
};
protoOf(Token).hb = function () {
  return this.tokenType;
};
protoOf(Token).ib = function () {
  return this.text;
};
protoOf(Token).x10 = function () {
  return this.start;
};
protoOf(Token).y10 = function () {
  return this.end;
};
protoOf(Token).z10 = function (tokenType, text, start, end) {
  return new Token(tokenType, text, start, end);
};
protoOf(Token).copy$default = function (tokenType, text, start, end, $super) {
  tokenType = tokenType === VOID ? this.tokenType : tokenType;
  text = text === VOID ? this.text : text;
  start = start === VOID ? this.start : start;
  end = end === VOID ? this.end : end;
  return $super === VOID ? this.z10(tokenType, text, start, end) : $super.z10.call(this, tokenType, text, start, end);
};
protoOf(Token).toString = function () {
  return 'Token(tokenType=' + this.tokenType.toString() + ', text=' + this.text + ', start=' + toString(this.start) + ', end=' + toString(this.end) + ')';
};
protoOf(Token).hashCode = function () {
  var result = this.tokenType.hashCode();
  result = imul(result, 31) + getStringHashCode(this.text) | 0;
  result = imul(result, 31) + hashCode(this.start) | 0;
  result = imul(result, 31) + hashCode(this.end) | 0;
  return result;
};
protoOf(Token).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Token))
    return false;
  var tmp0_other_with_cast = other instanceof Token ? other : THROW_CCE();
  if (!this.tokenType.equals(tmp0_other_with_cast.tokenType))
    return false;
  if (!(this.text === tmp0_other_with_cast.text))
    return false;
  if (!equals(this.start, tmp0_other_with_cast.start))
    return false;
  if (!equals(this.end, tmp0_other_with_cast.end))
    return false;
  return true;
};
var TokenType_CURLY_BRACE_L_instance;
var TokenType_CURLY_BRACE_R_instance;
var TokenType_SQUARE_BRACKET_L_instance;
var TokenType_SQUARE_BRACKET_R_instance;
var TokenType_ANGLE_BRACKET_L_instance;
var TokenType_ANGLE_BRACKET_R_instance;
var TokenType_COLON_instance;
var TokenType_DOT_instance;
var TokenType_END_DASH_instance;
var TokenType_COMMA_instance;
var TokenType_COMMENT_instance;
var TokenType_EMBED_OPEN_DELIM_instance;
var TokenType_EMBED_CLOSE_DELIM_instance;
var TokenType_EMBED_TAG_instance;
var TokenType_EMBED_TAG_STOP_instance;
var TokenType_EMBED_METADATA_instance;
var TokenType_EMBED_PREAMBLE_NEWLINE_instance;
var TokenType_EMBED_CONTENT_instance;
var TokenType_FALSE_instance;
var TokenType_UNQUOTED_STRING_instance;
var TokenType_ILLEGAL_CHAR_instance;
var TokenType_LIST_DASH_instance;
var TokenType_NULL_instance;
var TokenType_NUMBER_instance;
var TokenType_STRING_OPEN_QUOTE_instance;
var TokenType_STRING_CLOSE_QUOTE_instance;
var TokenType_STRING_CONTENT_instance;
var TokenType_TRUE_instance;
var TokenType_WHITESPACE_instance;
var TokenType_EOF_instance;
function values_0() {
  return [TokenType_CURLY_BRACE_L_getInstance(), TokenType_CURLY_BRACE_R_getInstance(), TokenType_SQUARE_BRACKET_L_getInstance(), TokenType_SQUARE_BRACKET_R_getInstance(), TokenType_ANGLE_BRACKET_L_getInstance(), TokenType_ANGLE_BRACKET_R_getInstance(), TokenType_COLON_getInstance(), TokenType_DOT_getInstance(), TokenType_END_DASH_getInstance(), TokenType_COMMA_getInstance(), TokenType_COMMENT_getInstance(), TokenType_EMBED_OPEN_DELIM_getInstance(), TokenType_EMBED_CLOSE_DELIM_getInstance(), TokenType_EMBED_TAG_getInstance(), TokenType_EMBED_TAG_STOP_getInstance(), TokenType_EMBED_METADATA_getInstance(), TokenType_EMBED_PREAMBLE_NEWLINE_getInstance(), TokenType_EMBED_CONTENT_getInstance(), TokenType_FALSE_getInstance(), TokenType_UNQUOTED_STRING_getInstance(), TokenType_ILLEGAL_CHAR_getInstance(), TokenType_LIST_DASH_getInstance(), TokenType_NULL_getInstance(), TokenType_NUMBER_getInstance(), TokenType_STRING_OPEN_QUOTE_getInstance(), TokenType_STRING_CLOSE_QUOTE_getInstance_0(), TokenType_STRING_CONTENT_getInstance(), TokenType_TRUE_getInstance(), TokenType_WHITESPACE_getInstance(), TokenType_EOF_getInstance_0()];
}
function valueOf_0(value) {
  switch (value) {
    case 'CURLY_BRACE_L':
      return TokenType_CURLY_BRACE_L_getInstance();
    case 'CURLY_BRACE_R':
      return TokenType_CURLY_BRACE_R_getInstance();
    case 'SQUARE_BRACKET_L':
      return TokenType_SQUARE_BRACKET_L_getInstance();
    case 'SQUARE_BRACKET_R':
      return TokenType_SQUARE_BRACKET_R_getInstance();
    case 'ANGLE_BRACKET_L':
      return TokenType_ANGLE_BRACKET_L_getInstance();
    case 'ANGLE_BRACKET_R':
      return TokenType_ANGLE_BRACKET_R_getInstance();
    case 'COLON':
      return TokenType_COLON_getInstance();
    case 'DOT':
      return TokenType_DOT_getInstance();
    case 'END_DASH':
      return TokenType_END_DASH_getInstance();
    case 'COMMA':
      return TokenType_COMMA_getInstance();
    case 'COMMENT':
      return TokenType_COMMENT_getInstance();
    case 'EMBED_OPEN_DELIM':
      return TokenType_EMBED_OPEN_DELIM_getInstance();
    case 'EMBED_CLOSE_DELIM':
      return TokenType_EMBED_CLOSE_DELIM_getInstance();
    case 'EMBED_TAG':
      return TokenType_EMBED_TAG_getInstance();
    case 'EMBED_TAG_STOP':
      return TokenType_EMBED_TAG_STOP_getInstance();
    case 'EMBED_METADATA':
      return TokenType_EMBED_METADATA_getInstance();
    case 'EMBED_PREAMBLE_NEWLINE':
      return TokenType_EMBED_PREAMBLE_NEWLINE_getInstance();
    case 'EMBED_CONTENT':
      return TokenType_EMBED_CONTENT_getInstance();
    case 'FALSE':
      return TokenType_FALSE_getInstance();
    case 'UNQUOTED_STRING':
      return TokenType_UNQUOTED_STRING_getInstance();
    case 'ILLEGAL_CHAR':
      return TokenType_ILLEGAL_CHAR_getInstance();
    case 'LIST_DASH':
      return TokenType_LIST_DASH_getInstance();
    case 'NULL':
      return TokenType_NULL_getInstance();
    case 'NUMBER':
      return TokenType_NUMBER_getInstance();
    case 'STRING_OPEN_QUOTE':
      return TokenType_STRING_OPEN_QUOTE_getInstance();
    case 'STRING_CLOSE_QUOTE':
      return TokenType_STRING_CLOSE_QUOTE_getInstance_0();
    case 'STRING_CONTENT':
      return TokenType_STRING_CONTENT_getInstance();
    case 'TRUE':
      return TokenType_TRUE_getInstance();
    case 'WHITESPACE':
      return TokenType_WHITESPACE_getInstance();
    case 'EOF':
      return TokenType_EOF_getInstance_0();
    default:
      TokenType_initEntries();
      THROW_IAE('No enum constant value.');
      break;
  }
}
var TokenType_entriesInitialized;
function TokenType_initEntries() {
  if (TokenType_entriesInitialized)
    return Unit_instance;
  TokenType_entriesInitialized = true;
  TokenType_CURLY_BRACE_L_instance = new TokenType('CURLY_BRACE_L', 0);
  TokenType_CURLY_BRACE_R_instance = new TokenType('CURLY_BRACE_R', 1);
  TokenType_SQUARE_BRACKET_L_instance = new TokenType('SQUARE_BRACKET_L', 2);
  TokenType_SQUARE_BRACKET_R_instance = new TokenType('SQUARE_BRACKET_R', 3);
  TokenType_ANGLE_BRACKET_L_instance = new TokenType('ANGLE_BRACKET_L', 4);
  TokenType_ANGLE_BRACKET_R_instance = new TokenType('ANGLE_BRACKET_R', 5);
  TokenType_COLON_instance = new TokenType('COLON', 6);
  TokenType_DOT_instance = new TokenType('DOT', 7);
  TokenType_END_DASH_instance = new TokenType('END_DASH', 8);
  TokenType_COMMA_instance = new TokenType('COMMA', 9);
  TokenType_COMMENT_instance = new TokenType('COMMENT', 10);
  TokenType_EMBED_OPEN_DELIM_instance = new TokenType('EMBED_OPEN_DELIM', 11);
  TokenType_EMBED_CLOSE_DELIM_instance = new TokenType('EMBED_CLOSE_DELIM', 12);
  TokenType_EMBED_TAG_instance = new TokenType('EMBED_TAG', 13);
  TokenType_EMBED_TAG_STOP_instance = new TokenType('EMBED_TAG_STOP', 14);
  TokenType_EMBED_METADATA_instance = new TokenType('EMBED_METADATA', 15);
  TokenType_EMBED_PREAMBLE_NEWLINE_instance = new TokenType('EMBED_PREAMBLE_NEWLINE', 16);
  TokenType_EMBED_CONTENT_instance = new TokenType('EMBED_CONTENT', 17);
  TokenType_FALSE_instance = new TokenType('FALSE', 18);
  TokenType_UNQUOTED_STRING_instance = new TokenType('UNQUOTED_STRING', 19);
  TokenType_ILLEGAL_CHAR_instance = new TokenType('ILLEGAL_CHAR', 20);
  TokenType_LIST_DASH_instance = new TokenType('LIST_DASH', 21);
  TokenType_NULL_instance = new TokenType('NULL', 22);
  TokenType_NUMBER_instance = new TokenType('NUMBER', 23);
  TokenType_STRING_OPEN_QUOTE_instance = new TokenType('STRING_OPEN_QUOTE', 24);
  TokenType_STRING_CLOSE_QUOTE_instance = new TokenType('STRING_CLOSE_QUOTE', 25);
  TokenType_STRING_CONTENT_instance = new TokenType('STRING_CONTENT', 26);
  TokenType_TRUE_instance = new TokenType('TRUE', 27);
  TokenType_WHITESPACE_instance = new TokenType('WHITESPACE', 28);
  TokenType_EOF_instance = new TokenType('EOF', 29);
}
function TokenType(name, ordinal) {
  Enum.call(this, name, ordinal);
}
function Message(message, severity, start, end) {
  this.message = message;
  this.severity = severity;
  this.start = start;
  this.end = end;
}
protoOf(Message).o7 = function () {
  return this.message;
};
protoOf(Message).c11 = function () {
  return this.severity;
};
protoOf(Message).v9 = function () {
  return this.start;
};
protoOf(Message).w10 = function () {
  return this.end;
};
protoOf(Message).hb = function () {
  return this.message;
};
protoOf(Message).ib = function () {
  return this.severity;
};
protoOf(Message).x10 = function () {
  return this.start;
};
protoOf(Message).y10 = function () {
  return this.end;
};
protoOf(Message).d11 = function (message, severity, start, end) {
  return new Message(message, severity, start, end);
};
protoOf(Message).copy$default = function (message, severity, start, end, $super) {
  message = message === VOID ? this.message : message;
  severity = severity === VOID ? this.severity : severity;
  start = start === VOID ? this.start : start;
  end = end === VOID ? this.end : end;
  return $super === VOID ? this.d11(message, severity, start, end) : $super.d11.call(this, message, severity, start, end);
};
protoOf(Message).toString = function () {
  return 'Message(message=' + this.message + ', severity=' + this.severity.toString() + ', start=' + toString(this.start) + ', end=' + toString(this.end) + ')';
};
protoOf(Message).hashCode = function () {
  var result = getStringHashCode(this.message);
  result = imul(result, 31) + this.severity.hashCode() | 0;
  result = imul(result, 31) + hashCode(this.start) | 0;
  result = imul(result, 31) + hashCode(this.end) | 0;
  return result;
};
protoOf(Message).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Message))
    return false;
  var tmp0_other_with_cast = other instanceof Message ? other : THROW_CCE();
  if (!(this.message === tmp0_other_with_cast.message))
    return false;
  if (!this.severity.equals(tmp0_other_with_cast.severity))
    return false;
  if (!equals(this.start, tmp0_other_with_cast.start))
    return false;
  if (!equals(this.end, tmp0_other_with_cast.end))
    return false;
  return true;
};
var MessageSeverity_ERROR_instance;
var MessageSeverity_WARNING_instance;
function values_1() {
  return [MessageSeverity_ERROR_getInstance(), MessageSeverity_WARNING_getInstance()];
}
function valueOf_1(value) {
  switch (value) {
    case 'ERROR':
      return MessageSeverity_ERROR_getInstance();
    case 'WARNING':
      return MessageSeverity_WARNING_getInstance();
    default:
      MessageSeverity_initEntries();
      THROW_IAE('No enum constant value.');
      break;
  }
}
var MessageSeverity_entriesInitialized;
function MessageSeverity_initEntries() {
  if (MessageSeverity_entriesInitialized)
    return Unit_instance;
  MessageSeverity_entriesInitialized = true;
  MessageSeverity_ERROR_instance = new MessageSeverity('ERROR', 0);
  MessageSeverity_WARNING_instance = new MessageSeverity('WARNING', 1);
}
function MessageSeverity(name, ordinal) {
  Enum.call(this, name, ordinal);
}
function Position_init_$Init$(coordinates, $this) {
  Position.call($this, coordinates.dm_1, coordinates.em_1);
  return $this;
}
function Position_init_$Create$(coordinates) {
  return Position_init_$Init$(coordinates, objectCreate(protoOf(Position)));
}
function Position(line, column) {
  this.line = line;
  this.column = column;
}
protoOf(Position).g11 = function () {
  return this.line;
};
protoOf(Position).h11 = function () {
  return this.column;
};
function convertTokens(internalTokens) {
  // Inline function 'kotlin.collections.mutableListOf' call
  var tokens = ArrayList_init_$Create$_0();
  var i = 0;
  while (i < internalTokens.l()) {
    var currentToken = internalTokens.m(i);
    switch (currentToken.re_1.v1_1) {
      case 24:
        var contentBuilder = StringBuilder_init_$Create$();
        var contentStart = null;
        var contentEnd = null;
        $l$loop: while (true) {
          var tmp;
          var _unary__edvuaz = i;
          i = _unary__edvuaz + 1 | 0;
          if (_unary__edvuaz < internalTokens.l()) {
            tmp = !setOf([TokenType_STRING_CLOSE_QUOTE_getInstance(), TokenType_EOF_getInstance()]).p(internalTokens.m(i).re_1);
          } else {
            tmp = false;
          }
          if (!tmp) {
            break $l$loop;
          }
          var contentToken = internalTokens.m(i);
          if (contentStart == null) {
            contentStart = contentToken.se_1.we_1.yl_1;
          }
          contentEnd = contentToken.se_1.we_1.zl_1;
          contentBuilder.w6(contentToken.te_1);
        }

        tokens.d(createPublicToken(TokenType_STRING_OPEN_QUOTE_getInstance(), currentToken));
        var tmp_0;
        var tmp_1;
        // Inline function 'kotlin.text.isNotEmpty' call

        if (charSequenceLength(contentBuilder) > 0) {
          tmp_1 = !(contentStart == null);
        } else {
          tmp_1 = false;
        }

        if (tmp_1) {
          tmp_0 = !(contentEnd == null);
        } else {
          tmp_0 = false;
        }

        if (tmp_0) {
          tokens.d(new Token(TokenType_STRING_CONTENT_getInstance(), contentBuilder.toString(), Position_init_$Create$(contentStart), Position_init_$Create$(contentEnd)));
        }

        if (i < internalTokens.l()) {
          if (internalTokens.m(i).re_1.equals(TokenType_STRING_CLOSE_QUOTE_getInstance())) {
            var closeQuoteToken = internalTokens.m(i);
            tokens.d(createPublicToken(TokenType_STRING_CLOSE_QUOTE_getInstance_0(), closeQuoteToken));
          } else if (!internalTokens.m(i).re_1.equals(TokenType_EOF_getInstance())) {
            throw IllegalStateException_init_$Create$('Bug: a string must end with a closing quote token or EOF');
          }
        }

        break;
      case 26:
      case 25:
      case 27:
      case 28:
      case 29:
        throw IllegalStateException_init_$Create$('String content tokens should be handled in STRING_OPEN_QUOTE case');
      case 0:
        tokens.d(createPublicToken(TokenType_CURLY_BRACE_L_getInstance(), currentToken));
        break;
      case 1:
        tokens.d(createPublicToken(TokenType_CURLY_BRACE_R_getInstance(), currentToken));
        break;
      case 2:
        tokens.d(createPublicToken(TokenType_SQUARE_BRACKET_L_getInstance(), currentToken));
        break;
      case 3:
        tokens.d(createPublicToken(TokenType_SQUARE_BRACKET_R_getInstance(), currentToken));
        break;
      case 4:
        tokens.d(createPublicToken(TokenType_ANGLE_BRACKET_L_getInstance(), currentToken));
        break;
      case 5:
        tokens.d(createPublicToken(TokenType_ANGLE_BRACKET_R_getInstance(), currentToken));
        break;
      case 6:
        tokens.d(createPublicToken(TokenType_COLON_getInstance(), currentToken));
        break;
      case 7:
        tokens.d(createPublicToken(TokenType_DOT_getInstance(), currentToken));
        break;
      case 8:
        tokens.d(createPublicToken(TokenType_END_DASH_getInstance(), currentToken));
        break;
      case 9:
        tokens.d(createPublicToken(TokenType_COMMA_getInstance(), currentToken));
        break;
      case 10:
        tokens.d(createPublicToken(TokenType_COMMENT_getInstance(), currentToken));
        break;
      case 11:
        tokens.d(createPublicToken(TokenType_EMBED_OPEN_DELIM_getInstance(), currentToken));
        break;
      case 12:
        tokens.d(createPublicToken(TokenType_EMBED_CLOSE_DELIM_getInstance(), currentToken));
        break;
      case 13:
        tokens.d(createPublicToken(TokenType_EMBED_TAG_getInstance(), currentToken));
        break;
      case 16:
        tokens.d(createPublicToken(TokenType_EMBED_PREAMBLE_NEWLINE_getInstance(), currentToken));
        break;
      case 17:
        tokens.d(createPublicToken(TokenType_EMBED_CONTENT_getInstance(), currentToken));
        break;
      case 18:
        tokens.d(createPublicToken(TokenType_FALSE_getInstance(), currentToken));
        break;
      case 19:
        tokens.d(createPublicToken(TokenType_UNQUOTED_STRING_getInstance(), currentToken));
        break;
      case 20:
        tokens.d(createPublicToken(TokenType_ILLEGAL_CHAR_getInstance(), currentToken));
        break;
      case 21:
        tokens.d(createPublicToken(TokenType_LIST_DASH_getInstance(), currentToken));
        break;
      case 22:
        tokens.d(createPublicToken(TokenType_NULL_getInstance(), currentToken));
        break;
      case 23:
        tokens.d(createPublicToken(TokenType_NUMBER_getInstance(), currentToken));
        break;
      case 30:
        tokens.d(createPublicToken(TokenType_TRUE_getInstance(), currentToken));
        break;
      case 31:
        tokens.d(createPublicToken(TokenType_WHITESPACE_getInstance(), currentToken));
        break;
      case 32:
        tokens.d(createPublicToken(TokenType_EOF_getInstance_0(), currentToken));
        break;
      case 15:
        tokens.d(createPublicToken(TokenType_EMBED_METADATA_getInstance(), currentToken));
        break;
      case 14:
        tokens.d(createPublicToken(TokenType_EMBED_TAG_STOP_getInstance(), currentToken));
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    i = i + 1 | 0;
  }
  return tokens;
}
function createPublicToken(publicTokenType, internalToken) {
  return new Token(publicTokenType, internalToken.se_1.ve_1, Position_init_$Create$(internalToken.se_1.we_1.yl_1), Position_init_$Create$(internalToken.se_1.we_1.zl_1));
}
function SimpleListIterator(list) {
  this.i11_1 = list.f();
}
protoOf(SimpleListIterator).next = function () {
  var tmp;
  if (this.i11_1.g()) {
    tmp = this.i11_1.h();
  } else {
    tmp = null;
  }
  return tmp;
};
function EnumHelper_0() {
}
protoOf(EnumHelper_0).name = function (value) {
  return value.u1_1;
};
protoOf(EnumHelper_0).ordinal = function (value) {
  return value.v1_1;
};
var EnumHelper_instance;
function EnumHelper_getInstance() {
  return EnumHelper_instance;
}
function FormattingStyle_PLAIN_getInstance_0() {
  FormattingStyle_initEntries();
  return FormattingStyle_PLAIN_instance;
}
function FormattingStyle_DELIMITED_getInstance_0() {
  FormattingStyle_initEntries();
  return FormattingStyle_DELIMITED_instance;
}
function FormattingStyle_COMPACT_getInstance_0() {
  FormattingStyle_initEntries();
  return FormattingStyle_COMPACT_instance;
}
function TokenType_CURLY_BRACE_L_getInstance() {
  TokenType_initEntries();
  return TokenType_CURLY_BRACE_L_instance;
}
function TokenType_CURLY_BRACE_R_getInstance() {
  TokenType_initEntries();
  return TokenType_CURLY_BRACE_R_instance;
}
function TokenType_SQUARE_BRACKET_L_getInstance() {
  TokenType_initEntries();
  return TokenType_SQUARE_BRACKET_L_instance;
}
function TokenType_SQUARE_BRACKET_R_getInstance() {
  TokenType_initEntries();
  return TokenType_SQUARE_BRACKET_R_instance;
}
function TokenType_ANGLE_BRACKET_L_getInstance() {
  TokenType_initEntries();
  return TokenType_ANGLE_BRACKET_L_instance;
}
function TokenType_ANGLE_BRACKET_R_getInstance() {
  TokenType_initEntries();
  return TokenType_ANGLE_BRACKET_R_instance;
}
function TokenType_COLON_getInstance() {
  TokenType_initEntries();
  return TokenType_COLON_instance;
}
function TokenType_DOT_getInstance() {
  TokenType_initEntries();
  return TokenType_DOT_instance;
}
function TokenType_END_DASH_getInstance() {
  TokenType_initEntries();
  return TokenType_END_DASH_instance;
}
function TokenType_COMMA_getInstance() {
  TokenType_initEntries();
  return TokenType_COMMA_instance;
}
function TokenType_COMMENT_getInstance() {
  TokenType_initEntries();
  return TokenType_COMMENT_instance;
}
function TokenType_EMBED_OPEN_DELIM_getInstance() {
  TokenType_initEntries();
  return TokenType_EMBED_OPEN_DELIM_instance;
}
function TokenType_EMBED_CLOSE_DELIM_getInstance() {
  TokenType_initEntries();
  return TokenType_EMBED_CLOSE_DELIM_instance;
}
function TokenType_EMBED_TAG_getInstance() {
  TokenType_initEntries();
  return TokenType_EMBED_TAG_instance;
}
function TokenType_EMBED_TAG_STOP_getInstance() {
  TokenType_initEntries();
  return TokenType_EMBED_TAG_STOP_instance;
}
function TokenType_EMBED_METADATA_getInstance() {
  TokenType_initEntries();
  return TokenType_EMBED_METADATA_instance;
}
function TokenType_EMBED_PREAMBLE_NEWLINE_getInstance() {
  TokenType_initEntries();
  return TokenType_EMBED_PREAMBLE_NEWLINE_instance;
}
function TokenType_EMBED_CONTENT_getInstance() {
  TokenType_initEntries();
  return TokenType_EMBED_CONTENT_instance;
}
function TokenType_FALSE_getInstance() {
  TokenType_initEntries();
  return TokenType_FALSE_instance;
}
function TokenType_UNQUOTED_STRING_getInstance() {
  TokenType_initEntries();
  return TokenType_UNQUOTED_STRING_instance;
}
function TokenType_ILLEGAL_CHAR_getInstance() {
  TokenType_initEntries();
  return TokenType_ILLEGAL_CHAR_instance;
}
function TokenType_LIST_DASH_getInstance() {
  TokenType_initEntries();
  return TokenType_LIST_DASH_instance;
}
function TokenType_NULL_getInstance() {
  TokenType_initEntries();
  return TokenType_NULL_instance;
}
function TokenType_NUMBER_getInstance() {
  TokenType_initEntries();
  return TokenType_NUMBER_instance;
}
function TokenType_STRING_OPEN_QUOTE_getInstance() {
  TokenType_initEntries();
  return TokenType_STRING_OPEN_QUOTE_instance;
}
function TokenType_STRING_CLOSE_QUOTE_getInstance_0() {
  TokenType_initEntries();
  return TokenType_STRING_CLOSE_QUOTE_instance;
}
function TokenType_STRING_CONTENT_getInstance() {
  TokenType_initEntries();
  return TokenType_STRING_CONTENT_instance;
}
function TokenType_TRUE_getInstance() {
  TokenType_initEntries();
  return TokenType_TRUE_instance;
}
function TokenType_WHITESPACE_getInstance() {
  TokenType_initEntries();
  return TokenType_WHITESPACE_instance;
}
function TokenType_EOF_getInstance_0() {
  TokenType_initEntries();
  return TokenType_EOF_instance;
}
function MessageSeverity_ERROR_getInstance() {
  MessageSeverity_initEntries();
  return MessageSeverity_ERROR_instance;
}
function MessageSeverity_WARNING_getInstance() {
  MessageSeverity_initEntries();
  return MessageSeverity_WARNING_instance;
}
//region block: post-declaration
defineProp(protoOf(FormattingStyle), 'name', protoOf(FormattingStyle).w1);
defineProp(protoOf(FormattingStyle), 'ordinal', protoOf(FormattingStyle).x1);
defineProp(protoOf(TokenType), 'name', protoOf(TokenType).w1);
defineProp(protoOf(TokenType), 'ordinal', protoOf(TokenType).x1);
defineProp(protoOf(MessageSeverity), 'name', protoOf(MessageSeverity).w1);
defineProp(protoOf(MessageSeverity), 'ordinal', protoOf(MessageSeverity).x1);
//endregion
//region block: init
Kson_instance = new Kson_0();
EnumHelper_instance = new EnumHelper_0();
//endregion
//region block: exports
var Kson = {getInstance: Kson_getInstance};
Result.Success = Success;
Result.Failure = Failure;
SchemaResult.Success = Success_0;
SchemaResult.Failure = Failure_0;
FormattingStyle.values = values;
FormattingStyle.valueOf = valueOf;
defineProp(FormattingStyle, 'PLAIN', FormattingStyle_PLAIN_getInstance_0);
defineProp(FormattingStyle, 'DELIMITED', FormattingStyle_DELIMITED_getInstance_0);
defineProp(FormattingStyle, 'COMPACT', FormattingStyle_COMPACT_getInstance_0);
IndentType.Spaces = Spaces;
defineProp(IndentType, 'Tabs', Tabs_getInstance);
TokenType.values = values_0;
TokenType.valueOf = valueOf_0;
defineProp(TokenType, 'CURLY_BRACE_L', TokenType_CURLY_BRACE_L_getInstance);
defineProp(TokenType, 'CURLY_BRACE_R', TokenType_CURLY_BRACE_R_getInstance);
defineProp(TokenType, 'SQUARE_BRACKET_L', TokenType_SQUARE_BRACKET_L_getInstance);
defineProp(TokenType, 'SQUARE_BRACKET_R', TokenType_SQUARE_BRACKET_R_getInstance);
defineProp(TokenType, 'ANGLE_BRACKET_L', TokenType_ANGLE_BRACKET_L_getInstance);
defineProp(TokenType, 'ANGLE_BRACKET_R', TokenType_ANGLE_BRACKET_R_getInstance);
defineProp(TokenType, 'COLON', TokenType_COLON_getInstance);
defineProp(TokenType, 'DOT', TokenType_DOT_getInstance);
defineProp(TokenType, 'END_DASH', TokenType_END_DASH_getInstance);
defineProp(TokenType, 'COMMA', TokenType_COMMA_getInstance);
defineProp(TokenType, 'COMMENT', TokenType_COMMENT_getInstance);
defineProp(TokenType, 'EMBED_OPEN_DELIM', TokenType_EMBED_OPEN_DELIM_getInstance);
defineProp(TokenType, 'EMBED_CLOSE_DELIM', TokenType_EMBED_CLOSE_DELIM_getInstance);
defineProp(TokenType, 'EMBED_TAG', TokenType_EMBED_TAG_getInstance);
defineProp(TokenType, 'EMBED_TAG_STOP', TokenType_EMBED_TAG_STOP_getInstance);
defineProp(TokenType, 'EMBED_METADATA', TokenType_EMBED_METADATA_getInstance);
defineProp(TokenType, 'EMBED_PREAMBLE_NEWLINE', TokenType_EMBED_PREAMBLE_NEWLINE_getInstance);
defineProp(TokenType, 'EMBED_CONTENT', TokenType_EMBED_CONTENT_getInstance);
defineProp(TokenType, 'FALSE', TokenType_FALSE_getInstance);
defineProp(TokenType, 'UNQUOTED_STRING', TokenType_UNQUOTED_STRING_getInstance);
defineProp(TokenType, 'ILLEGAL_CHAR', TokenType_ILLEGAL_CHAR_getInstance);
defineProp(TokenType, 'LIST_DASH', TokenType_LIST_DASH_getInstance);
defineProp(TokenType, 'NULL', TokenType_NULL_getInstance);
defineProp(TokenType, 'NUMBER', TokenType_NUMBER_getInstance);
defineProp(TokenType, 'STRING_OPEN_QUOTE', TokenType_STRING_OPEN_QUOTE_getInstance);
defineProp(TokenType, 'STRING_CLOSE_QUOTE', TokenType_STRING_CLOSE_QUOTE_getInstance_0);
defineProp(TokenType, 'STRING_CONTENT', TokenType_STRING_CONTENT_getInstance);
defineProp(TokenType, 'TRUE', TokenType_TRUE_getInstance);
defineProp(TokenType, 'WHITESPACE', TokenType_WHITESPACE_getInstance);
defineProp(TokenType, 'EOF', TokenType_EOF_getInstance_0);
MessageSeverity.values = values_1;
MessageSeverity.valueOf = valueOf_1;
defineProp(MessageSeverity, 'ERROR', MessageSeverity_ERROR_getInstance);
defineProp(MessageSeverity, 'WARNING', MessageSeverity_WARNING_getInstance);
var EnumHelper = {getInstance: EnumHelper_getInstance};
export {
  Kson as Kson,
  Result as Result,
  SchemaResult as SchemaResult,
  SchemaValidator as SchemaValidator,
  FormatOptions as FormatOptions,
  FormattingStyle as FormattingStyle,
  IndentType as IndentType,
  Analysis as Analysis,
  Token as Token,
  TokenType as TokenType,
  Message as Message,
  MessageSeverity as MessageSeverity,
  Position as Position,
  SimpleListIterator as SimpleListIterator,
  EnumHelper as EnumHelper,
};
//endregion

//# sourceMappingURL=kson-lib-kotlin.mjs.map
