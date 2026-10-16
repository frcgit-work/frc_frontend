import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectorsRoutingModule } from './sectors-routing.module';
import { SectorsComponent } from '../sectors/sectors.component';
import { OrgsComponent } from './component/orgs/orgs.component';
import { DecreeComponent } from './component/decree/decree.component';
import { OrgDetailComponent } from './component/org-detail/org-detail.component';
import { DocumentComponent } from './component/document/document.component';
import { LoaderModule } from '../shared/ui/loader/loader.module';
import { DecisionComponent } from './component/decision/decision.component';
import { FilesComponent } from './component/files/files.component';
import { ENoticeComponent } from './component/enotice/enotice.component';
import { DamageAssesorComponent } from './component/Insurance/damage-assesor/damage-assesor.component';
import { BankBrokerComponent } from './component/Insurance/bank-broker/bank-broker.component';
import { InsuranceComponent } from './component/Insurance/insurance/insurance.component';
import { LongInsuranceComponent } from './component/Insurance/long-insurance/long-insurance.component';
import { ReInsuranceComponent } from './component/Insurance/re-insurance/re-insurance.component';
import { InsuranceActuarianComponent } from './component/Insurance/insurance-actuarian/insurance-actuarian.component';
import { DeActiveReprensentativeComponent } from './component/Insurance/de-active-reprensentative/de-active-reprensentative.component';
import { InsuranceReprensentativeComponent } from './component/Insurance/insurance-reprensentative/insurance-reprensentative.component';
import { HaabComponent } from './component/securitie/haab/haab.component';
import { HiuComponent } from './component/securitie/hiu/hiu.component';
import { HbutsComponent } from './component/securitie/hbuts/hbuts.component';
import { HomkComponent } from './component/securitie/homk/homk.component';
import { CustodianComponent } from './component/securitie/custodian/custodian.component';
import { LawCompanyComponent } from './component/Insurance/law-company/law-company.component';
import { ApprCompanyComponent } from './component/Insurance/appr-company/appr-company.component';
import { AuditCompanyComponent } from './component/Insurance/audit-company/audit-company.component';
import { InsuranceBrokerComponent } from './component/Insurance/insurance-broker/insurance-broker.component';
import { SecbrokerComponent } from './component/securitie/secbroker/secbroker.component';
import { DealerComponent } from './component/securitie/dealer/dealer.component';
import { UnderwriterComponent } from './component/securitie/underwriter/underwriter.component';
import { HozComponent } from './component/securitie/hoz/hoz.component';
import { NominalComponent } from './component/securitie/nominal/nominal.component';
import { FstComponent } from './component/securitie/fst/fst.component';
import { NbfiComponent } from './component/bbsb/nbfi/nbfi.component';
import { DeactiveComponent } from './component/Realestate/deactive/deactive.component';
import { OrgDetailOldComponent } from './component/org-detail-old/org-detail-old.component';
import { MiningComponent } from './component/securitie/mining/mining.component';
import { ZereglelComponent } from './component/securitie/zereglel/zereglel.component';
import { PersonComponent } from './component/person/person/person.component';
import { MiningExchangeComponent } from './component/Insurance/mining-exchange/mining-exchange.component';

@NgModule({
 declarations: [
  SectorsComponent,
  OrgsComponent,
  DecreeComponent,
  OrgDetailComponent,
  DocumentComponent,
  DecisionComponent,
  FilesComponent,
  ENoticeComponent,
  DamageAssesorComponent,
  BankBrokerComponent,
  InsuranceComponent,
  LongInsuranceComponent,
  ReInsuranceComponent,
  InsuranceActuarianComponent,
  DeActiveReprensentativeComponent,
  InsuranceReprensentativeComponent,
  HaabComponent,
  HiuComponent,
  HbutsComponent,
  HomkComponent,
  CustodianComponent,
  LawCompanyComponent,
  ApprCompanyComponent,
  AuditCompanyComponent,
  InsuranceBrokerComponent,
  SecbrokerComponent,
  DealerComponent,
  UnderwriterComponent,
  HozComponent,
  NominalComponent,
  FstComponent,
  NbfiComponent,
  DeactiveComponent,
  OrgDetailOldComponent,
  MiningComponent,
  ZereglelComponent,
  PersonComponent,
  MiningExchangeComponent,
 ],
 imports: [CommonModule, SectorsRoutingModule, LoaderModule],
})
export class SectorsModule {}
