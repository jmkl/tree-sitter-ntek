/**
 * @file ntek config
 * @author jmkl
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "ntek",

  extras: ($) => [/\s/, $.comment],

  rules: {
    source_file: ($) => repeat($.statement),

    statement: ($) => choice($.assignment),

    // -------------------------
    // Comments
    // -------------------------
    comment: (_) => token(seq("#", /.*/)),

    // -------------------------
    // Assignment
    // -------------------------
    assignment: ($) => seq(field("key", $.key), "=", field("value", $.value)),

    key: ($) => choice($.identifier, $.keybind),

    // -------------------------
    // Values
    // -------------------------
    value: ($) =>
      choice($.string, $.number, $.boolean, $.array, $.object, $.call, $.path),

    // -------------------------
    // Primitives
    // -------------------------
    identifier: (_) => /[a-zA-Z_][a-zA-Z0-9_-]*/,

    keybind: (_) => /[A-Z](?:-[A-Z])+-[a-zA-Z]/,

    string: (_) => token(seq('"', repeat(choice(/[^"\\]/, /\\./)), '"')),

    number: (_) => /\d+/,

    boolean: (_) => choice("true", "false"),

    // -------------------------
    // Collections
    // -------------------------
    array: ($) =>
      seq("[", optional(seq($.value, repeat(seq(",", $.value)))), "]"),

    object: ($) =>
      seq("{", optional(seq($.pair, repeat(seq(",", $.pair)))), "}"),

    pair: ($) => seq(field("key", $.identifier), ":", field("value", $.value)),

    // -------------------------
    // Calls & Paths
    // -------------------------
    path: ($) => prec(1, seq($.identifier, repeat(seq("::", $.identifier)))),

    call: ($) =>
      prec(
        2,
        seq(
          field("callee", choice($.path, $.identifier)),
          "(",
          optional(seq($.value, repeat(seq(",", $.value)))),
          ")",
        ),
      ),
  },
});
