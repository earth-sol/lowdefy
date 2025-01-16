# Building Forms in Lowdefy

## Pt. 1: Text Input

A crucial element of form design is managing text input.
First and last name, email, phone number and password fields all involve text input, although some of them have their own nuances.

Lowdefy features thoughtfully designed input blocks designed to meet the requirements of the various use cases you may encounter.

Some examples of Lowdefy's Input Blocks include:

- TextInput
- TextArea
- PhoneNumberInput

TextInput blocks have a `type` field, allowing them to adapt to the requirements of different use cases.

In the example below, the name fields are configured with the basic `text` type property.
The password field masks the user's input by replacing their input with dots.

```yaml ldf
_ref: pages/blog/categories/forms/TextInput/name_pw_form.yaml
```

Other types include `url` and `number`.

There are a few special types of text input blocks with additional features.
The `PhoneNumberInput` block, for example, features a dropdown country selector for the dialing code.

```yaml ldf
_ref: pages/blog/categories/forms/TextInput/phone_input.yaml
```

### Required Input and Validation

Blocks can be marked as required, preventing the user from submitting the form without completing these fields.

Marking a block as `required` adds the familiar red asterisk.
With the example above, the user would not be allowed to submit the form without entering a last name and email address.

In order to mark a field as required, its validation criteria must be set with the `Validate` action.

Input errors can occur for a few reasons, such as user typos or incorrect formatting.
Data validation prevents these errors, and error messages can show the user how to correct them.

The `Validate` action is generally configured to run before inserting information into a database with a request.
If the field's criteria are not met, the `Validate` action will fail, which will stop the execution of actions that are defined after it.

A common use case for this action would be to ensure that an email address includes an "@" symbol and ends with a top-level domain (e.g, ".com").
This can be accomplished with regex, as seen in the example below.

```yaml ldf
_ref: pages/blog/categories/forms/TextInput/email_validate.yaml
```

Note that the regex above has been truncated. The complete pattern can be seen below.  
`'^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'`

The first time a `Validate` action is called, validation errors and warnings are shown to the user.

Following this, the validation can be reset with the `ResetValidation` action. To reset both the validation status and the page state, the `Reset` action can be used instead.

The `Validate` action can also target specific blocks with the `blockId` or `blockIds` params.

### Properties

The default configuration for each block acts as a skeleton for the developer to tweak to their needs.

An intuitive set of optional properties can be used to fine tune the functionality and appearance of the block.

#### allowClear

This property adds a button to clear the field of its current input.

#### disabled

This property determines whether a block can be edited by the user.
By default, this property is set to `false`.
Setting its value to true greys out the block, and changes the cursor to indicate that it cannot be clicked.

#### label

The label of an input field refers to the title that is displayed to the user.
This property has its own set of properties, allowing you to change its position, for example, or decide whether it should have a colon or not.

For example, you may choose to disable a field, set a maximum length, or add a button to clear its input.

These are just a few of the options available.

[Our docs](https://docs.lowdefy.com/TextInput) feature a complete list of the properties that can be set on TextInput blocks.

## Learn More

TextInput is just one of the many input blocks available in Lowdefy.

Keep an eye out for the next entry in this series, covering checkboxes and radio selectors.

Start your own Lowdefy project to try out TextInput blocks.

```bash
pnpx lowdefy@4 init && pnpx lowdefy@4 dev
 # note: requires node v18 (or newer) and pnpm
```

Don't forget to look through our [docs](https://docs.lowdefy.com/TextInput) for more details on features and implementation.
