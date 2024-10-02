import { Meta, StoryFn } from '@storybook/react';
import Button, { ButtonProps } from './Button';

export default {
  title: 'Example/Button',
  component: Button,
} as Meta;

const Template: StoryFn<ButtonProps> = (args: ButtonProps) => (
  <Button {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Click Me',
  onClick: () => alert('Button clicked!'),
};
