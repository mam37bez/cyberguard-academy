'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { courses } from '@/data/courses';
export default function EnrollmentPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [f, setF] = useState({pn:'',pe:'',pp:'',cn:'',ca:'',ci:'',agree:false});
  const ch = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {const{name,value,type}=e.target;setF(p=>({...p,[name]:type==='checkbox'?(e.target as HTMLInputElement).checked:value}));};
  const sub = async (e: React.FormEvent) => {e.preventDefault();setLoading(true);await new Promise(r=>setTimeout(r,2000));setLoading(false);setDone(true);};
  if(done) return (<div className="pt-24 pb-16"><div className="max-w-2xl mx-auto px-4 text-center"><div className="text-6xl mb-6">🎉</div><h1 className="text-3xl font-bold text-white mb-4">Заявка отправлена!</h1><p className="text-gray-400 mb-8">Перезвоним в течение 24 часов.</p><Button onClick={()=>setDone(false)} variant="primary">Ещё</Button></div></div>);
  return (<div className="pt-24 pb-16"><div className="max-w-3xl mx-auto px-4">
    <SectionHeading badge="Запись" title="Записаться" subtitle="Заполните форму" />
    <Card variant="glow"><CardContent><form onSubmit={sub} className="space-y-8">
      <div><h3 className="text-lg font-semibold text-white mb-4">👤 Родитель</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Input label="ФИО" name="pn" value={f.pn} onChange={ch} required /><Input label="Email" name="pe" type="email" value={f.pe} onChange={ch} required /></div><div className="mt-4"><Input label="Телефон" name="pp" type="tel" value={f.pp} onChange={ch} required /></div></div>
      <div><h3 className="text-lg font-semibold text-white mb-4">👦 Ученик</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Input label="Имя" name="cn" value={f.cn} onChange={ch} required /><Input label="Возраст" name="ca" value={f.ca} onChange={ch} required /></div></div>
      <div><h3 className="text-lg font-semibold text-white mb-4">📚 Курс</h3><select name="ci" value={f.ci} onChange={ch} required className="w-full rounded-xl bg-cyber-dark border border-cyber-border px-4 py-3 text-white focus:ring-2 focus:ring-primary-500"><option value="">Выберите...</option>{courses.map(c=>(<option key={c.id} value={c.id}>{c.icon} {c.title}</option>))}</select></div>
      <label className="flex gap-3 cursor-pointer"><input type="checkbox" name="agree" checked={f.agree} onChange={ch} required className="mt-1" /><span className="text-sm text-gray-400">Согласен на обработку данных</span></label>
      <Button type="submit" size="lg" isLoading={loading} className="w-full">🎓 Отправить</Button>
      <p className="text-center text-sm text-gray-500">Пробное занятие — бесплатно!</p>
    </form></CardContent></Card>
  </div></div>);
}
