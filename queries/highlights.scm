;; ----------------------------
;; Keywords / operators
;; ----------------------------

"=" @operator
"::" @operator
"," @punctuation.delimiter

"(" @punctuation.bracket
")" @punctuation.bracket
"[" @punctuation.bracket
"]" @punctuation.bracket

;; ----------------------------
;; Identifiers
;; ----------------------------

(identifier) @variable

(key) @property

;; Path like Baz::Func
(path
  (identifier) @type)

;; ----------------------------
;; Function calls
;; ----------------------------

(call
   (identifier) @function)

(call
   (path
    (identifier) @type
    (identifier) @function))

;; ----------------------------
;; Literals
;; ----------------------------

(string) @string
(number) @number
(boolean) @boolean


;; ----------------------------
;; Arrays
;; ----------------------------

(array) @constructor

;; ----------------------------
;; Comments
;; ----------------------------

(comment) @comment

;; ----------------------------
;; Errors (optional but useful)
;; ----------------------------

(ERROR) @error
