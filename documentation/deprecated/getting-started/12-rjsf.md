## `@UISchema()`

Can be used on individual property or class

### Simple

@Rjsf({
title: 'A registration form',
description: 'A simple form example.",
})

```
class User {

  @Property({
    type: "string",
    title: "First name"
    minLength: 10,
    required: true
  })
  @UISchema()
  declare firstName: string

}
```

### Nested

```

```
