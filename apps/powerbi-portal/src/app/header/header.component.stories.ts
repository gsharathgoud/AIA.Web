import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../../environments/environment';
import { FiltersState } from '@aia.web/shared/data-access';
import { I18nModule } from '../../i18n/i18n.module';
import { HeaderComponent } from './header.component';

export default {
  title: 'HeaderComponent',
  component: HeaderComponent,
  decorators: [
    withDesign,
    moduleMetadata({
      imports: [
        NgxsModule.forRoot([FiltersState], {
          developmentMode: !environment.production,
        }),
        I18nModule,
      ],
    }),
  ],
} as Meta<HeaderComponent>;

export const Template: Story<HeaderComponent> = (args: HeaderComponent) => ({
  component: HeaderComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
Primary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/1hyNCT3kHGiSOzvcKxc8Vg/Alliant-Branding-%26-Design-Playground?node-id=2%3A20',
  },
};
