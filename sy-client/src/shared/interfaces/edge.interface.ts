import { TransportMethod } from '../enumeration/transportation-method.enum';

export interface Edge {
    first: number;
    second: number;
    transportMethod: TransportMethod;
}
