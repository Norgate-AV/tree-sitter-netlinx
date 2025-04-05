(foo
#IF_DEFINED BAR
&& baz
#END_IF
&& foobar)
#IF_DEFINED BAR
    (foo && baz && foobar)
#ELSE
    (foo && foobar)
#END_IF
