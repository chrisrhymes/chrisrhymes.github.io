---
title: Getting started with React Hook Form
description: Getting started with React Hook Form to build validation into a form from the perspective of a Laravel developer
layout: post
date: 2024-05-10 18:00:07
hero_image: /img/getting-started-with-react-hook-form.jpg
hero_height: is-large
hero_darken: true
image: /img/getting-started-with-react-hook-form.jpg
tags: React JavaScript WebDev
---

I normally develop forms in Laravel, using Livewire where possible. Laravel has some great form validation tools built in that I'm really used to working with and Livewire offers easy to use state management. For this project though, I had to build the form in a React project.

I looked for a package that would provide the validation and state management that I was used to but for React. After a bit of searching I found the [React Hook Form](https://react-hook-form.com/) package that seemed to offer exactly what I was after. The tagline on their website reads:

> Performant, flexible and extensible forms with easy-to-use validation.

It was easy to install using npm:

```bash
npm install react-hook-form
```

Then I could start using it in my form.

## The example form

The example form has a text input that is used to enter an email address. The form will submit and just console log out the data for this demo.

```tsx
import { useForm, SubmitHandler } from "react-hook-form";

interface MyFormInputs {
  Email: string;
}

const MyForm = () => {
  const { handleSubmit, register } = useForm<MyFormInputs>({});
  const onSubmit: SubmitHandler<MyFormInputs> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label for="Email">Email</label>
      <input name="Email" type="text" {...register("Email")} id="Email" />
      <input type="submit" value="Submit" />
    </form>
  );
};
```

There is a lot going on here, but let's start with the interface `MyFormInputs`. This is where you define the fields for your form, and what type they are. In our example we have Email which is a string.

Once we define our interface, we can then pass it into the useForm so that knows what fields are in your form.

In this example we are passing in an empty object into useForm, but there are some handy options that can be defined here if you want to, such as setting default values. Here we could set a default value for our email field.

```tsx
const { handleSubmit } = useForm<MyFormInputs>({
  defaultValues: {
    Email: "test@example.com",
  },
});
```

Take a look at the [API documentation for useForm](https://react-hook-form.com/docs/useform) for more information.

When the form is submitted it will call the handleSubmit method from useForm, which will then call our custom onSubmit method that console logs the data. If we press the submit button we will get an object with the key 'Email' and the data we typed into the input.

## Controlled components

I already had some form components in my project that I wanted to reuse as it would save me a lot of time and reduce risk of duplicating code. React Hook Form allows you to use a [Controller component](https://react-hook-form.com/get-started#IntegratingControlledInputs) that you can use to render your controlled inputs.

In the code below I am wrapping the TextInput component inside the render method of the Controller. I can then pass in the value and the onChange method to the controlled input and React Hook Form manages the state changes for me.

```tsx
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface MyFormInputs {
  Email: string;
}

const MyForm = () => {
  const { handleSubmit, control } = useForm<MyFormInputs>({});
  const onSubmit: SubmitHandler<MyFormInputs> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="TextField"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            name="email"
            onChange={onChange}
            value={value}
            label="Email"
          />
        )}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};
```

We set the name of the controller to the name of our field 'Email' and pass in the control from the useForm. Once we have wired it all up it will act the same as the standard HTML input from the previous example.

## Validation rules

Now we want to add some validation rules to our field. We want the field to be required and we want it to be a valid email. The Controller component allows us to pass in rules object with our validation rules.

In the code below, we are adding the rules object with the required rule and the pattern for the email.

{% raw %}

```tsx
<Controller
  name="TextField"
  control={control}
  rules={{
    required: true,
    pattern:
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  }}
  render={({ field: { onChange, value } }) => (
    <TextInput name="email" onChange={onChange} value={value} label="Email" />
  )}
/>
```

{% endraw %}

In Laravel there are many validation rules that we can choose from that allow us to validate our input, such as a built in rule for email. Here we have to define the pattern ourselves, which is fine, just a little less convenient.

React Hook Form has less options, but they should cover most of your needs for client side validation. I would recommend doing server side validation on the server receiving the form data anyway.

Now if we submit the form with no value, or without a valid email address it will no longer submit the form. The handleSubmit method checks the inputs against the rules and fails the validation.

But right now we don't have any feedback for the user to tell them the validation has failed.

## Validation messages

The useForm hook has a form state object, which contains an errors object. We can use this to display our errors to the user. We need to update our code so we can use this errors object.

```tsx
const {
  handleSubmit,
  control,
  formState: { errors },
} = useForm<MyFormInputs>({});
```

Now we can update our input component. The TextInput component has a boolean flag for isErrored, which when true makes the border a red colour. It also has an errorText method that allows us to pass in the error message.

The isErrored can be checked to see if the errors object has the Email key. If it does, pass in true, which makes the border red.

The errorText needs us to do a bit more work first. Laravel has a lot of predefined error messages that we can use, but with React Hook Form we need to define our own.

This is done by updating the items in the rules object to be an object with value and message keys.

{% raw %}

```tsx
<Controller
  name="TextField"
  control={control}
  rules={{
    required: { value: true, message: "The email address is required." },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "The email address is invalid.",
    },
  }}
  render={({ field: { onChange, value } }) => (
    <TextInput
      name="email"
      onChange={onChange}
      value={value}
      label="Email"
      isErrored={errors.Email ? true : false}
      errorText={errors.Email ? errors.Email.message : null}
    />
  )}
/>
```

{% endraw %}

Now when we press submit, it validates the inputs as before, but now the TextInput will have a red border and the error message we defined will display alongside the input.

If we don't put any value in and press submit, it will display 'The email address is required.' and if we put in an invalid email address, such as with spaces, then it will display 'The email address is invalid.'.

## Error summary

Imagine we have a form with several inputs. When we press submit we may not see the validation error as it could be at the top of the form and out of the current view.

We could display a summary of errors at the top of the form and scroll up to it. We need a way of knowing when the validation has failed. React Hook Form has this covered for us too.

We can define a method for when the validation fails, which we will call onSubmitFailed. I'm not going to provide the code here, just giving you an idea of how it could work.

```tsx
const onSubmitFailed = () => {
  // Scroll to top of form
  // Display error summary
};
```

Then when we call handleSubmit, we can pass our new method in as the second argument. This callback will run when the validation fails and there are errors.

```tsx
<form onSubmit={handleSubmit(onSubmit, onSubmitFailed)}>
```

## Conclusion

We have gone from creating a simple form, to managing the state in our controlled components, to showing an error state and validation messages, to showing a summary of all the error messages.

This library is very handy and has lots of really useful features. The documentation seems really great with examples and full API documentation.

<a href="https://stocksnap.io/photo/city-skyline-68NE2VS3GG">Photo</a> by <a href="https://stocksnap.io/author/mattbangophotos">Matt Bango</a> on <a href="https://stocksnap.io">StockSnap</a>
