;; Comments
(comment) @comment

;; Identifiers
(identifier) @identifier

;; Constants
[
    (true)
    (false)
] @constant

;; Keywords
[
    (program_name_keyword)
    (module_name_keyword)
    (define_device_keyword)
    (define_constant_keyword)
    (define_type_keyword)
    (define_variable_keyword)
    (define_start_keyword)
    (define_event_keyword)
    (define_mutually_exclusive_keyword)
    (define_function_keyword)
    (define_combine_keyword)
    (define_connect_level_keyword)
    (define_latching_keyword)
    (define_toggling_keyword)
    (define_program_keyword)
    (define_call_keyword)
    (define_module_keyword)

    (local_var_keyword)
    (stack_var_keyword)
    (constant_keyword)
    (volatile_keyword)
    (non_volatile_keyword)
    (persistent_keyword)

    (if_keyword)
    (else_keyword)
    (switch_keyword)
    (case_keyword)
    (default_keyword)
    (while_keyword)
    (for_keyword)
    (break_keyword)
    (continue_keyword)
    (return_keyword)
    (select_keyword)
    (active_keyword)

    (push_keyword)
    (release_keyword)
    (hold_keyword)
    (repeat_keyword)

    (on_keyword)
    (off_keyword)

    (online_keyword)
    (offline_keyword)
    (onerror_keyword)
    (string_keyword)
    (command_keyword)
    (awake_keyword)
    (standby_keyword)

    (send_level_keyword)
    (send_string_keyword)
    (send_command_keyword)
    (clear_buffer_keyword)
    (create_buffer_keyword)
    (create_multi_buffer_keyword)
    ;; (call_keyword)

    (devchan_on_keyword)
    (devchan_off_keyword)
    (devchan_to_keyword)
    (devchan_min_to_keyword)
    (devchan_total_off_keyword)
    (devchan_pulse_keyword)

    (wait_keyword)
    (wait_until_keyword)
    (cancel_wait_keyword)
    (cancel_wait_until_keyword)
    (cancel_all_wait_keyword)
    (cancel_all_wait_until_keyword)

    (button_event_keyword)
    (channel_event_keyword)
    (data_event_keyword)
    (level_event_keyword)
    (timeline_event_keyword)
    (custom_event_keyword)
] @keyword

;; Types
[
    (char_keyword)
    (widechar_keyword)
    (integer_keyword)
    (sinteger_keyword)
    (long_keyword)
    (slong_keyword)
    (float_keyword)
    (double_keyword)
    (dev_keyword)
    (devlev_keyword)
    (devchan_keyword)
    (struct_keyword)
    (structure_keyword)
] @type

;; Operators
[
    "="
    "+"
    "-"
    "*"
    "/"
    "%"
    "++"
    "--"
] @operator

;; Literals
(string_literal) @string
(number_literal) @number
(hex_literal) @number
(device_literal) @number
