export class Offer {
      $key?: number;
      title: string;
      location: string;
      content: string;
      level: string;
      duration: string;
      date: string;
      img: string;
      logo: string;
      payment: boolean;
      supervisorName: string;
      maxCapacity: number;
      currentCapacity: number;
      timeDemand: [number, string, string];
      amount?: number;
      url: string;
      institution: string;
      featured: boolean;
      aofi: Array<any>;
      sofi: Array<any>;
}