import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AppComponent } from './app.component';
import { I18nModule } from '../i18n/i18n.module';

export default {
  title: 'AppComponent',
  component: AppComponent,
  decorators: [
    moduleMetadata({
      imports: [I18nModule],
    }),
  ],
} as Meta<AppComponent>;

const Template: Story<AppComponent> = (args: AppComponent) => ({
  component: AppComponent,
  props: args,
});

export const Welcome = Template.bind({});
Welcome.args = {};
