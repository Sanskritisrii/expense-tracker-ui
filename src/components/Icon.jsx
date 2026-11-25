const paths = {
  food: (c) => (<><circle cx="12" cy="12" r="7" fill="none" stroke={c} strokeWidth="2" /><circle cx="12" cy="12" r="2.6" fill={c} /></>),
  travel: (c) => (<><rect x="4" y="4" width="16" height="13" rx="3" fill="none" stroke={c} strokeWidth="2" /><path d="M4 11h16" stroke={c} strokeWidth="2" /><circle cx="8" cy="19" r="1.6" fill={c} /><circle cx="16" cy="19" r="1.6" fill={c} /></>),
  study: (c) => (<><path d="M12 6c-2-1.5-5-2-8-1.5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-13c-3-.5-6 0-8 1.5z" fill="none" stroke={c} strokeWidth="2" strokeLinejoin="round" /><path d="M12 6v13" stroke={c} strokeWidth="2" /></>),
  bills: (c) => (<><rect x="7" y="3" width="10" height="18" rx="2.5" fill="none" stroke={c} strokeWidth="2" /><circle cx="12" cy="17.5" r="1.2" fill={c} /></>),
  user: (c) => (<><circle cx="12" cy="8" r="4" fill="none" stroke={c} strokeWidth="2" /><path d="M4 21c1-5 15-5 16 0" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" /></>),
  lock: (c) => (<><rect x="5" y="11" width="14" height="10" rx="2.5" fill="none" stroke={c} strokeWidth="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke={c} strokeWidth="2" /></>),
  coin: (c) => (<><circle cx="12" cy="12" r="9" fill="none" stroke={c} strokeWidth="2" /><path d="M9 8h6M9 11h6M10 8c4 0 4 5 0 5l4 4" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" /></>),
  pen: (c) => (<path d="M4 20l1-5L16 4l4 4L9 19z" fill="none" stroke={c} strokeWidth="2" strokeLinejoin="round" />),
  close: (c) => (<path d="M5 5l14 14M19 5L5 19" stroke={c} strokeWidth="2.4" strokeLinecap="round" />),
  chevron: (c) => (<path d="M9 5l7 7-7 7" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />),
};

export default function Icon({ name, color = "#fff", size = 22 }) {
  const draw = paths[name];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {draw ? draw(color) : null}
    </svg>
  );
}
