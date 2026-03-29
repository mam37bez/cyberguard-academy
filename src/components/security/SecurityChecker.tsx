'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getSecurityLevel } from '@/lib/utils';

const questions = [
  {id:'q1',text:'Используете ли вы разные пароли?',category:'Пароли',weight:15},
  {id:'q2',text:'Включена ли двухфакторная аутентификация?',category:'2FA',weight:15},
  {id:'q3',text:'Обновляете ли вы ОС регулярно?',category:'Обновления',weight:10},
  {id:'q4',text:'Используете ли вы антивирус?',category:'Защита',weight:10},
  {id:'q5',text:'Проверяете ли вы ссылки?',category:'Фишинг',weight:10},
  {id:'q6',text:'Используете ли VPN в публичном Wi-Fi?',category:'Сеть',weight:10},
  {id:'q7',text:'Делаете ли резервные копии?',category:'Бэкапы',weight:10},
  {id:'q8',text:'Знаете ли как распознать мошеннический звонок?',category:'Мошенники',weight:10},
  {id:'q9',text:'Ограничиваете ли информацию в соцсетях?',category:'Приватность',weight:5},
  {id:'q10',text:'Используете ли менеджер паролей?',category:'Пароли',weight:5},
];
const recs: Record<string,string> = {
  q1:'Используйте уникальные пароли. Bitwarden — бесплатный менеджер.',
  q2:'Включите 2FA на всех важных аккаунтах.',
  q3:'Настройте автообновление ОС.',
  q4:'Установите антивирус.',
  q5:'Проверяйте URL перед переходом.',
  q6:'Используйте VPN в публичных сетях.',
  q7:'Настройте резервное копирование (правило 3-2-1).',
  q8:'Никогда не сообщайте коды из SMS по телефону.',
  q9:'Ограничьте видимость профиля в соцсетях.',
  q10:'Установите Bitwarden или KeePassXC.',
};

export function SecurityChecker() {
  const [answers, setAnswers] = useState<Record<string,boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [current, setCurrent] = useState(0);

  const handleAnswer = (qid: string, ans: boolean) => {
    setAnswers(p=>({...p,[qid]:ans}));
    if(current<questions.length-1) setCurrent(p=>p+1);
    else setShowResults(true);
  };

  const score = Object.entries(answers).reduce((s,[k,v])=>{
    const q = questions.find(q=>q.id===k);
    return s+(v&&q?q.weight:0);
  },0);

  const reset = ()=>{setAnswers({});setShowResults(false);setCurrent(0);};

  if(showResults) {
    const {color,label} = getSecurityLevel(score);
    const recommendations = questions.filter(q=>!answers[q.id]).map(q=>recs[q.id]);
    return (
      <div className="max-w-2xl mx-auto">
        <Card variant="glow"><CardContent>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Результаты</h3>
            <div className="relative w-40 h-40 mx-auto mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#1e1e3f" strokeWidth="8"/>
                <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${score*2.83} ${283-score*2.83}`}/>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold" style={{color}}>{score}</span>
                <span className="text-sm text-gray-400">из 100</span>
              </div>
            </div>
            <div className="inline-flex px-4 py-2 rounded-full border text-sm font-medium mb-6" style={{borderColor:color,color}}>Уровень: {label}</div>
          </div>
          {recommendations.length>0&&(
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">📋 Рекомендации:</h4>
              <ul className="space-y-3">{recommendations.map((r,i)=>(<li key={i} className="flex gap-3 text-sm text-gray-300"><span className="text-yellow-400">⚡</span>{r}</li>))}</ul>
            </div>
          )}
          {score===100&&<div className="text-center p-6 rounded-xl bg-cyber-green/10 border border-cyber-green/20 mb-6"><span className="text-4xl block mb-2">🏆</span><p className="text-cyber-green font-semibold">Отличный результат!</p></div>}
          <div className="text-center"><Button onClick={reset} variant="outline">🔄 Пройти снова</Button></div>
        </CardContent></Card>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div className="max-w-2xl mx-auto">
      <Card variant="glow"><CardContent>
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2"><span>Вопрос {current+1}/{questions.length}</span><span>{Math.round(current/questions.length*100)}%</span></div>
          <div className="w-full h-2 bg-cyber-dark rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-primary-500 to-cyber-green rounded-full transition-all duration-500" style={{width:`${current/questions.length*100}%`}}/></div>
        </div>
        <div className="inline-flex px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-medium mb-4">{q.category}</div>
        <h3 className="text-xl font-bold text-white mb-8">{q.text}</h3>
        <div className="grid grid-cols-2 gap-4">
          <Button size="lg" variant="secondary" onClick={()=>handleAnswer(q.id,true)} className="w-full">✅ Да</Button>
          <Button size="lg" variant="outline" onClick={()=>handleAnswer(q.id,false)} className="w-full">❌ Нет</Button>
        </div>
      </CardContent></Card>
    </div>
  );
}
