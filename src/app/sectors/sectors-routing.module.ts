import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from '../list/list.component';
import { ViewComponent } from '../view/view.component';
import { DecisionComponent } from './component/decision/decision.component';
import { DecreeComponent } from './component/decree/decree.component';
import { DocumentComponent } from './component/document/document.component';
import { FilesComponent } from './component/files/files.component';
import { OrgDetailComponent } from './component/org-detail/org-detail.component';
import { OrgsComponent } from './component/orgs/orgs.component';
import { SectorsComponent } from './sectors.component';
import { ENoticeComponent } from './component/enotice/enotice.component';
import { BankBrokerComponent } from './component/Insurance/bank-broker/bank-broker.component';
import { DamageAssesorComponent } from './component/Insurance/damage-assesor/damage-assesor.component';
import { InsuranceComponent } from './component/Insurance/insurance/insurance.component';
import { LongInsuranceComponent } from './component/Insurance/long-insurance/long-insurance.component';
import { ReInsuranceComponent } from './component/Insurance/re-insurance/re-insurance.component';
import { InsuranceActuarianComponent } from './component/Insurance/insurance-actuarian/insurance-actuarian.component';
import { DeActiveReprensentativeComponent } from './component/Insurance/de-active-reprensentative/de-active-reprensentative.component';
import { InsuranceReprensentativeComponent } from './component/Insurance/insurance-reprensentative/insurance-reprensentative.component';
import { CustodianComponent } from './component/securitie/custodian/custodian.component';
import { HbutsComponent } from './component/securitie/hbuts/hbuts.component';
import { HiuComponent } from './component/securitie/hiu/hiu.component';
import { HomkComponent } from './component/securitie/homk/homk.component';
import { HaabComponent } from './component/securitie/haab/haab.component';
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

const routes: Routes = [
 { path: '', pathMatch: 'full', redirectTo: '' },
 {
  path: '',
  component: SectorsComponent,
  children: [
   { path: '', pathMatch: 'full', redirectTo: 'org' },
   { path: 'list', component: ListComponent },
   { path: 'list/:id', component: ListComponent },
   { path: 'view', component: ViewComponent },
   { path: 'view/:id', component: ViewComponent },
   { path: 'decision', component: DecisionComponent },
   { path: 'decision/:id', component: DecisionComponent },
   { path: 'e-notice', component: ENoticeComponent },
   { path: 'e-notice/:id', component: ENoticeComponent },
   { path: 'org', component: OrgsComponent },
   { path: 'org/:id', component: OrgsComponent },
   { path: 'org-detail', component: OrgDetailComponent },
   { path: 'org-detail/:id', component: OrgDetailComponent },
   { path: 'old-detail', component: OrgDetailOldComponent },
   { path: 'old-detail/:id', component: OrgDetailOldComponent },
   { path: 'doc/list', component: DocumentComponent },
   { path: 'doc/list/:id', component: DocumentComponent },
   { path: 'doc/decree', component: DecreeComponent },
   { path: 'doc/decree/:id', component: DecreeComponent },
   { path: 'doc/file', component: FilesComponent },
   { path: 'doc/file/:id', component: FilesComponent },
   { path: 'bank-broker/', component: BankBrokerComponent },
   { path: 'bank-broker/:id', component: BankBrokerComponent },
   { path: 'insurance-broker/:id', component: InsuranceBrokerComponent },
   { path: 'insurance-broker/', component: InsuranceBrokerComponent },
   { path: 'damage/', component: DamageAssesorComponent },
   { path: 'damage/:id', component: DamageAssesorComponent },
   { path: 'insurance/', component: InsuranceComponent },
   { path: 'insurance/:id', component: InsuranceComponent },
   { path: 'longinsurance/', component: LongInsuranceComponent },
   { path: 'longinsurance/:id', component: LongInsuranceComponent },
   { path: 'reinsurance/', component: ReInsuranceComponent },
   { path: 'reinsurance/:id', component: ReInsuranceComponent },
   { path: 'actuarian/', component: InsuranceActuarianComponent },
   { path: 'actuarian/:id', component: InsuranceActuarianComponent },
   { path: 'deactive/', component: DeActiveReprensentativeComponent },
   { path: 'deactive/:id', component: DeActiveReprensentativeComponent },
   { path: 'insreprensentative/', component: InsuranceReprensentativeComponent },
   { path: 'insreprensentative/:id', component: InsuranceReprensentativeComponent },
   { path: 'lawcompany/', component: LawCompanyComponent },
   { path: 'lawcompany/:id', component: LawCompanyComponent },
   { path: 'apprcompany/', component: ApprCompanyComponent },
   { path: 'apprcompany/:id', component: ApprCompanyComponent },
   { path: 'auditcompany/', component: AuditCompanyComponent },
   { path: 'auditcompany/:id', component: AuditCompanyComponent },
   { path: 'custodian/', component: CustodianComponent },
   { path: 'custodian/:id', component: CustodianComponent },
   { path: 'homk/', component: HomkComponent },
   { path: 'homk/:id', component: HomkComponent },
   { path: 'haab/', component: HaabComponent },
   { path: 'haab/:id', component: HaabComponent },
   { path: 'hbuts/', component: HbutsComponent },
   { path: 'hbuts/:id', component: HbutsComponent },
   { path: 'hiu/', component: HiuComponent },
   { path: 'hiu/:id', component: HiuComponent },
   { path: 'nbfi/', component: NbfiComponent },
   { path: 'nbfi/:id', component: NbfiComponent },
   { path: 'secbroker/', component: SecbrokerComponent },
   { path: 'secbroker/:id', component: SecbrokerComponent },
   { path: 'dealer/', component: DealerComponent },
   { path: 'dealer/:id', component: DealerComponent },
   { path: 'underwriter/', component: UnderwriterComponent },
   { path: 'underwriter/:id', component: UnderwriterComponent },
   { path: 'hoz/', component: HozComponent },
   { path: 'hoz/:id', component: HozComponent },
   { path: 'nominal/', component: NominalComponent },
   { path: 'nominal/:id', component: NominalComponent },
   { path: 'fst/', component: FstComponent },
   { path: 'fst/:id', component: FstComponent },
   { path: 'realestate/', component: DeactiveComponent },
   { path: 'realestate/:id', component: DeactiveComponent },
   { path: 'mining/', component: MiningComponent },
   { path: 'mining/:id', component: MiningComponent },
   { path: 'miningexchange/', component: MiningExchangeComponent },
   { path: 'miningexchange/:id', component: MiningExchangeComponent },
   { path: 'zereglel/', component: ZereglelComponent },
   { path: 'zereglel/:id', component: ZereglelComponent },
   { path: 'person/', component: PersonComponent },
   { path: 'person/:id', component: PersonComponent },
  ],
 },
];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule],
})
export class SectorsRoutingModule {}
