import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { VisualComponent } from './visual.component';

export default {
  title: 'VisualComponent',
  component: VisualComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<VisualComponent>;

const Template: Story<VisualComponent> = (args: VisualComponent) => ({
  component: VisualComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
