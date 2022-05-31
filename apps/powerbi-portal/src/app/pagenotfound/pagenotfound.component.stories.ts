import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PageNotFoundComponent } from './pagenotfound.component';

export default {
  title: 'PageNotFoundComponent',
  component: PageNotFoundComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<PageNotFoundComponent>;

const Template: Story<PageNotFoundComponent> = (args: PageNotFoundComponent) => ({
  component: PageNotFoundComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
