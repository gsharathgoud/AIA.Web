import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { BannerComponent } from './banner.component';

export default {
  title: 'BannerComponent',
  component: BannerComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<BannerComponent>;

const Template: Story<BannerComponent> = (args: BannerComponent) => ({
  component: BannerComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
