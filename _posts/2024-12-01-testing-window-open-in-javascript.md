---
title: Testing window.open() in JavaScript with Jest
description: How I tested the window.open() method in JavaScript with react-testing-library and jest
layout: post
hero_image: /img/testing-window-open.jpg
hero_height: is-large
hero_darken: true
image: /img/testing-window-open.jpg
tags: webdev javascript testing
---

I recently had to write a test for a React component that opened a new browser window. To open the new window I made use of window.open() in my code. This made the component easy to write, but I had to think a bit differently about how to write the test for this.

More information on [the window.open() method](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) is available on mdn web docs.

To set a bit or background, I had a React component that had a simple form with a couple of inputs. When the user completed the inputs and submitted the form it opened a new window to a specified URL with the inputs as URL parameters.

## The component to test

Here is a very simplified version of the component as a demonstration. I'd recommend using something like [react-hook-form](https://www.react-hook-form.com/) to add validation to your form.

```jsx
// MyForm.js
import React, { useState } from "react";

const MyForm = ({ baseURL }) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");

  const onSubmit = () => {
    window.open(
      `${baseURL}?name=${encodeURIComponent(name)}&subject=${encodeURIComponent(
        subject
      )}`,
      "_blank"
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input name="name" id="name" onChange={(e) => setName(e.target.value)} />
      <label htmlFor="subject">Subject</label>
      <input
        name="subject"
        id="subject"
        onChange={(e) => setSubject(e.target.value)}
      />
      <input type="submit" value="Submit (opens in new window)" />
    </form>
  );
};

export default MyForm;
```

Now we have our component, lets think about the test for it.

## What I'd normally test

Normally I would test what has been rendered in my component, using assertions such as expect the component to have text content or assert the url is what is expected (using window.location.href), but I quickly realised that approach won't work in jest for this example.

Window.open opens a new browser window, so it doesn't affect the component we are testing. We can't see what is inside the new window or what its url is as it is outside of the scope of the component we are testing.

So how do we test something that is outside of what we can see? We don't actually need to test that a new window is opened as that would be testing the window interface's functionality and not our code. Instead, we just need to test that the window.open method is called.

## Mocking window.open()

Therefore we need to mock window.open() and test that it was called inside our code.

```jsx
// Mock window.open
global.open = jest.fn();
```

Now we can set the values in the inputs, submit our form and then test that the window.open was called. We can use fireEvent to set the values of the inputs and pressing the submit button.

```jsx
fireEvent.input(screen.getByLabelText("Name"), {
  target: {
    value: "Test Name",
  },
});
fireEvent.input(screen.getByLabelText("Subject"), {
  target: {
    value: "An example subject",
  },
});
fireEvent.submit(
  screen.getByRole("button", { name: "Submit (opens in new window)" })
);
```

It's worth having a read through the documentation for the [considerations for fireEvent](https://testing-library.com/docs/guide-events). You may want to use user-event instead depending on your use case.

We want to await for the method to run. We can do that using [waitFor()](https://testing-library.com/docs/dom-testing-library/api-async/#waitfor).

```jsx
await waitFor(() => {
  expect(global.open).toHaveBeenCalled();
});
```

To ensure we are not opening loads of new windows, we can check that we only call window.open once.

```jsx
await waitFor(() => {
  expect(global.open).toHaveBeenCalledTimes(1);
});
```

We can also check what arguments the method is called with, passing in the URL we expect as the first argument and the target as the second.

```jsx
await waitFor(() => {
  expect(global.open).toHaveBeenCalledWith(
    "http://example.com?name=Test%20Name&subject=An%20example%20subject",
    "_blank"
  );
});
```

## The complete test file

Here is the complete test file for your reference.

```jsx
// MyForm.test.js
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MyForm from "./MyForm";

describe("MyForm test", () => {
  beforeEach(() => {
    // Mock window.open
    global.open = jest.fn();
  });

  it("opens a new window with the correct url", async () => {
    render(<MyForm baseURL="http://example.com" />);

    fireEvent.input(screen.getByLabelText("Name"), {
      target: {
        value: "Test Name",
      },
    });
    fireEvent.input(screen.getByLabelText("Subject"), {
      target: {
        value: "An example subject",
      },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: "Submit (opens in new window)" })
    );

    await waitFor(() => {
      expect(global.open).toHaveBeenCalled();
      expect(global.open).toHaveBeenCalledTimes(1);
      expect(global.open).toHaveBeenCalledWith(
        "http://example.com?name=Test%20Name&subject=An%20example%20subject",
        "_blank"
      );
    });
  });
});
```

<a href="https://stocksnap.io/photo/laptop-apple-UOI2HF8SXU">Photo</a> by <a href="https://stocksnap.io/author/41320">energepic.com </a> on <a href="https://stocksnap.io">StockSnap</a>
