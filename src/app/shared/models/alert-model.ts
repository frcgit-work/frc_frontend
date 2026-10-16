import { AlertType } from '../enums/alert-type';

export interface AlertModel {
 show: boolean;
 type: AlertType;
 title: string;
 message: string;
}
