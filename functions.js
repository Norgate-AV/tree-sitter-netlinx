const netlinx = require("./netlinx");

module.exports = {
    set_length_array: ($) =>
        seq(
            netlinx.set_length_array,
            field("array", $.identifier),
            ",",
            field("size", $.expression),
        ),

    timeline_function: ($) => choice($.timeline_create, $.timeline_kill),

    timeline_create: ($) =>
        prec.right(
            seq(
                netlinx.timeline_create,
                field("timeline", $.expression),
                ",",
                field("events", $.argument_list),
                optional(
                    seq(
                        ",",
                        field(
                            "mode",
                            choice(
                                netlinx.timeline_absolute,
                                netlinx.timeline_relative,
                            ),
                        ),
                        optional(
                            seq(
                                ",",
                                field(
                                    "repeat",
                                    choice(
                                        netlinx.timeline_repeat,
                                        netlinx.timeline_once,
                                    ),
                                ),
                            ),
                        ),
                    ),
                ),
            ),
        ),

    timeline_kill: ($) =>
        seq(netlinx.timeline_kill, field("timeline", $.expression)),
};
