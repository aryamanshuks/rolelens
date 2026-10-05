"use client";
import {useEffect,useState} from "react";
export default function Home(){
 const [role,setRole]=useState("Product Manager"); const [jd,setJd]=useState(""); const [bg,setBg]=useState(""); const [data,setData]=useState(null); const [stats,setStats]=useState(null); const [loading,setLoading]=useState(false); const [err,setErr]=useState("");
 async function loadStats(){try{const r=await fetch("/api/stats"); if(r.ok)setStats(await r.json())}catch{}}
 useEffect(()=>{loadStats()},[]);
 async function submit(e){e.preventDefault();setErr("");setData(null);setLoading(true);try{const r=await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetRole:role,jobDescription:jd,candidateBackground:bg})});const x=await r.json();if(!r.ok)throw new Error(x.error||"Analysis failed");setData(x);loadStats()}catch(e){setErr(e.message)}finally{setLoading(false)}}
 return <main>
  <nav><div className="logo">ROLE<span>LENS</span></div><div className="badge">Evidence-first career intelligence</div></nav>
  <section className="hero"><p className="eyebrow">STOP GUESSING WHAT TO LEARN NEXT</p><h1>See the <em>three gaps</em><br/>between you and the role.</h1><p className="sub">Paste a job description and your background. RoleLens uses Gemini to identify the three highest-priority gaps, the proof recruiters need, and a focused 7-day plan.</p></section>
  <section className="grid">
   <form onSubmit={submit} className="card form">
    <label>Target role<input value={role} onChange={e=>setRole(e.target.value)} maxLength="120" required/></label>
    <label>Job description<textarea value={jd} onChange={e=>setJd(e.target.value)} placeholder="Paste the role requirements here…" minLength="80" maxLength="8000" required/></label>
    <label>Your background<textarea value={bg} onChange={e=>setBg(e.target.value)} placeholder="Experience, projects, skills, achievements…" minLength="50" maxLength="6000" required/></label>
    <button disabled={loading}>{loading?"Analyzing evidence…":"Find my 3 gaps →"}</button>
    <small>Career guidance, not a hiring guarantee. Avoid entering sensitive personal information.</small>
   </form>
   <aside className="card side"><p className="eyebrow">LIVE SIGNAL</p><h2>What roles demand</h2>{stats?.topSkills?.length?<div className="skills">{stats.topSkills.map((s,i)=><div key={s.skill}><span>{i+1}. {s.skill}</span><b>{s.count}</b></div>)}</div>:<p className="muted">Skill demand will appear as analyses are completed.</p>}<div className="count">{stats?.total??0}<span> analyses logged</span></div></aside>
  </section>
  {err&&<div className="error">{err}</div>}
  {data&&<section className="results"><div className="resultHead"><p className="eyebrow">YOUR ROLELENS</p><h2>Three gaps worth closing first.</h2></div><div className="gapgrid">{data.topGaps.map((g,i)=><article className="gap" key={i}><div className="num">0{i+1}</div><h3>{g.gap}</h3><p>{g.whyItMatters}</p><strong>Evidence to build</strong><p>{g.evidenceToBuild}</p></article>)}</div><div className="plan"><h2>Your 7-day evidence sprint</h2>{data.actionPlan.map((d,i)=><div className="day" key={i}><b>DAY {d.day}</b><span>{d.action}</span></div>)}</div></section>}
  <footer>RoleLens · Built as an evidence-first GenAI prototype</footer>
 </main>
}