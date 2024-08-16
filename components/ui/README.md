### TCard

```vue
<TCard title="title">
    <template #actions>
        <TButton>
            Button
        </TButton>
    </template>
    <div>

    </div>
</TCard>
```

### Notification

```ts
Notification({
  title: `title`,
  message: 'This is a message that does not automatically close',
})
```

### TButton

```vue
<TButton size="small" type="primary">
    <CheckCircleIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
    Small Primary Button
</TButton>

<TButton size="medium" type="primary">
    Medium Primary Button
</TButton>

<TButton size="large" type="primary">
    Large Primary Button
</TButton>

<TButton size="xlarge" type="primary">
    XLarge Primary Button
</TButton>

<TButton size="small" type="text">
    Small text Button
</TButton>

<TButton size="medium" type="text">
    Medium text Button
</TButton>

<TButton size="large" type="text">
    Large text Button
</TButton>

<TButton size="xlarge" type="text">
    XLarge text Button
</TButton>
```
