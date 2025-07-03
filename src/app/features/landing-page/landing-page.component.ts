import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ToastModule } from 'primeng/toast';

import { LogoComponent } from './logo/logo.component';
import { HeroComponent } from './hero/hero.component';
import { FeatureComponent } from './feature/feature.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { MobileIntroComponent } from './mobile-intro/mobile-intro.component';
import { VideoIntroComponent } from './video-intro/video-intro.component';
import { DifferenceComponent } from './difference/difference.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { FixedBarComponent } from './fixed-bar/fixed-bar.component';
import { GlobalModalHostComponent } from '../../shared/components/global-modal-host/global-modal-host.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    LogoComponent,
    HeroComponent,
    FeatureComponent,
    BenefitsComponent,
    MobileIntroComponent,
    VideoIntroComponent,
    DifferenceComponent,
    FaqComponent,
    ContactComponent,
    FixedBarComponent,
    GlobalModalHostComponent,
    ToastModule,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}
