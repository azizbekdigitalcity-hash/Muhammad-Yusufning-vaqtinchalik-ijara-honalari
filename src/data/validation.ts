export function formatUZS(amount: number): string {
  return `${amount.toLocaleString('en-US')} UZS`;
}

export interface HoursValidationResult {
  valid: boolean;
  hours: number | null;
  error: string | null;
}

export function validateHours(rawValue: string): HoursValidationResult {
  const trimmed = rawValue.trim();

  if (trimmed === '') {
    return {
      valid: false,
      hours: null,
      error: 'Iltimos, ijara davomiyligini kiriting (1 dan 8 soatgacha).',
    };
  }

  if (trimmed.includes('.') || trimmed.includes(',')) {
    return {
      valid: false,
      hours: null,
      error: 'Kasr sonlar qabul qilinmaydi. Faqat 1 dan 8 gacha butun son kiriting.',
    };
  }

  if (!/^-?\d+$/.test(trimmed)) {
    return {
      valid: false,
      hours: null,
      error: 'Faqat 1 dan 8 gacha butun son kiriting.',
    };
  }

  const parsed = Number(trimmed);

  if (!Number.isInteger(parsed)) {
    return {
      valid: false,
      hours: null,
      error: 'Faqat butun son kiriting.',
    };
  }

  if (parsed < 0) {
    return {
      valid: false,
      hours: null,
      error: 'Manfiy son kiritish mumkin emas. 1 dan 8 gacha son kiriting.',
    };
  }

  if (parsed === 0) {
    return {
      valid: false,
      hours: null,
      error: '0 soat kiritish mumkin emas. Kamida 1 soat kiriting.',
    };
  }

  if (parsed > 8) {
    return {
      valid: false,
      hours: null,
      error: 'Maksimal ijara vaqti 8 soat. 1 dan 8 gacha son kiriting.',
    };
  }

  return {
    valid: true,
    hours: parsed,
    error: null,
  };
}

export interface NameValidationResult {
  valid: boolean;
  trimmedName: string;
  error: string | null;
}

export function validateCustomerName(rawName: string): NameValidationResult {
  const trimmedName = rawName.trim();

  if (trimmedName.length === 0) {
    return {
      valid: false,
      trimmedName: '',
      error: "Iltimos, mijozning to‘liq ismini kiriting.",
    };
  }

  return {
    valid: true,
    trimmedName,
    error: null,
  };
}
