import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReportsComponent } from './reports.component';

export default {
  title: 'ReportsComponent',
  component: ReportsComponent,
  decorators: [
    moduleMetadata({
      imports: [HttpClientTestingModule],
    }),
  ],
} as Meta<ReportsComponent>;

const Template: Story<ReportsComponent> = (args: ReportsComponent) => ({
  component: ReportsComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
