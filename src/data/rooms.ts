import roomX01Img from '../assets/images/room_x01_study_1794642104609.jpg';
import roomX02Img from '../assets/images/room_x02_meeting_1794642105432.jpg';
import roomX03Img from '../assets/images/room_x03_small_studio_1794642105861.jpg';
import roomX04Img from '../assets/images/room_x04_seminar_1794642106756.jpg';

export interface Room {
  id: 'X01' | 'X02' | 'X03' | 'X04';
  name: string;
  capacityPeople: number;
  capacityLabel: string;
  equipment: string;
  hourlyPrice: number;
  description: string;
  imageUrl: string;
}

export const ROOMS: Room[] = [
  {
    id: 'X01',
    name: "O‘quv xonasi",
    capacityPeople: 10,
    capacityLabel: '10 kishi',
    equipment: 'Doska',
    hourlyPrice: 50000,
    description:
      "Guruh darslari, repetitorlik mashg‘ulotlari va o‘quv seminarlar uchun yorug‘ va qulay xona.",
    imageUrl: roomX01Img,
  },
  {
    id: 'X02',
    name: 'Uchrashuv xonasi',
    capacityPeople: 6,
    capacityLabel: '6 kishi',
    equipment: 'Televizor',
    hourlyPrice: 40000,
    description:
      'Hamkorlar bilan muzokaralar, taqdimotlar va kichik jamoaviy muhokamalar uchun sokin xona.',
    imageUrl: roomX02Img,
  },
  {
    id: 'X03',
    name: 'Kichik studiya',
    capacityPeople: 4,
    capacityLabel: '4 kishi',
    equipment: 'Yoritish jihozlari',
    hourlyPrice: 70000,
    description:
      'Video darslar, podkastlar, intervyular va kontent suratga olish uchun tayyor studiya.',
    imageUrl: roomX03Img,
  },
  {
    id: 'X04',
    name: 'Seminar xonasi',
    capacityPeople: 20,
    capacityLabel: '20 kishi',
    equipment: 'Proyektor',
    hourlyPrice: 100000,
    description:
      "Treninglar, mahorat darslari va kengaytirilgan jamoaviy yig‘ilishlar uchun keng zal.",
    imageUrl: roomX04Img,
  },
];

export {
  formatUZS,
  validateHours,
  validateCustomerName,
  type HoursValidationResult,
  type NameValidationResult,
} from './validation';
