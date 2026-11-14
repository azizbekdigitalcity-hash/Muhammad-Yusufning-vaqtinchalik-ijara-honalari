import { useState } from 'react';
import { ArrowRight, Building2, Monitor, Users } from 'lucide-react';
import { Room, formatUZS } from '../data/rooms';

interface RoomCardProps {
  room: Room;
  onSelect: (room: Room) => void;
}

export function RoomCard({ room, onSelect }: RoomCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_12px_30px_-12px_rgba(15,23,42,0.12)]">
      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
        {!imageError ? (
          <img
            src={room.imageUrl}
            alt={`${room.name} (${room.id}) — ${room.capacityLabel}, ${room.equipment}`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500 p-6 text-center">
            <Building2 className="h-8 w-8 text-slate-400" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold text-slate-600">
              {room.id}
            </span>
            <span className="text-sm font-medium text-slate-700">
              {room.name}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="font-mono font-semibold text-slate-700">{room.id}</span>
          <span aria-hidden="true">·</span>
          <span>{room.capacityLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{room.equipment}</span>
        </div>

        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-slate-900">
          {room.name}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {room.description}
        </p>

        <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-sm">
          <div className="flex items-center gap-2 text-slate-700">
            <Users className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
            <div>
              <dt className="sr-only">Sig‘imi</dt>
              <dd className="font-medium">{room.capacityLabel}</dd>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <Monitor className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
            <div>
              <dt className="sr-only">Jihozlar</dt>
              <dd className="font-medium">{room.equipment}</dd>
            </div>
          </div>
        </dl>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
          <div>
            <span className="block text-xs text-slate-500">Soatlik narxi</span>
            <span className="font-display text-lg font-bold tabular-nums text-[#1D4ED8]">
              {formatUZS(room.hourlyPrice)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onSelect(room)}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#0F172A] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Xonani tanlash</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
