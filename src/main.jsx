import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Activity, Bell, ChevronRight, CircleDollarSign, Download, LayoutDashboard, Menu, Package, Search, Settings, ShoppingBag, TrendingUp, Users, X } from 'lucide-react'
import './styles.css'

function Mark({ dark = false }) {
  return <a className={`mark ${dark ? 'mark-dark' : ''}`} href="/index.html" aria-label="Submission home"><span className="mark-glyph">A</span><span>ALGORYX<br/><small>LAB SERIES</small></span></a>
}

const orders = [
  ['#NS-2084','Maya Patel','Pro plan','₹12,400','Paid'],
  ['#NS-2083','Rohan Shah','Team seats','₹8,900','Paid'],
  ['#NS-2082','Diya Nair','Starter','₹3,200','Pending'],
  ['#NS-2081','Arjun Rao','Enterprise','₹24,600','Paid']
]

function MiniBars() {
  return <div className="bars" aria-label="Revenue trend chart">{[35,52,44,70,58,82,76,94,68,88,100,92].map((h,i)=><i key={i} style={{height:`${h}%`}}/> )}</div>
}

function Dashboard() {
  const [menu,setMenu] = useState(false), [query,setQuery] = useState(''), [notice,setNotice] = useState(false)
  const visible = orders.filter(row => row.join(' ').toLowerCase().includes(query.toLowerCase()))
  const nav = [[LayoutDashboard,'Overview'],[Activity,'Analytics'],[ShoppingBag,'Orders'],[Users,'Customers'],[Package,'Products']]
  return <div className="dash-shell">
    <aside className={menu?'dash-side open':'dash-side'}><div className="side-top"><Mark/><button className="icon-btn mobile-only" onClick={()=>setMenu(false)}><X/></button></div>
      <div className="workspace"><span>WORKSPACE</span><strong>Northstar Commerce</strong></div>
      <nav>{nav.map(([Icon,label],i)=><button className={i===0?'active':''} key={label}><Icon size={19}/>{label}{i===2&&<span className="nav-count">12</span>}</button>)}</nav>
      <div className="side-lower"><button><Settings size={19}/>Settings</button><div className="profile"><span>AN</span><div><strong>Aarav N.</strong><small>Administrator</small></div></div></div>
    </aside>
    <main className="dash-main">
      <header className="dash-top"><button className="icon-btn mobile-only" onClick={()=>setMenu(true)}><Menu/></button><div className="dash-search"><Search size={18}/><input aria-label="Search orders" placeholder="Search orders, customers..." value={query} onChange={e=>setQuery(e.target.value)}/><kbd>⌘ K</kbd></div><button className="icon-btn" onClick={()=>setNotice(!notice)}><Bell size={20}/><i/></button><button className="primary-btn"><Download size={17}/>Export</button>{notice&&<div className="notification"><strong>You're all caught up</strong><span>Revenue report generated 8m ago</span></div>}</header>
      <div className="dash-content"><div className="title-row"><div><p className="eyebrow">MONDAY, 30 SEPTEMBER</p><h1>Good evening, Aarav.</h1><p>Here is what changed across your store today.</p></div><select aria-label="Date range"><option>Last 30 days</option><option>Last 7 days</option></select></div>
      <section className="metric-grid">{[
        [CircleDollarSign,'Total revenue','₹8,42,690','+12.8%'],[ShoppingBag,'Orders','2,408','+8.4%'],[Users,'Customers','18,290','+5.2%'],[TrendingUp,'Conversion','4.82%','+0.7%']
      ].map(([Icon,label,val,gain])=><article className="metric" key={label}><div><span className="metric-icon"><Icon size={20}/></span><span className="gain">{gain}</span></div><p>{label}</p><h2>{val}</h2><small>vs previous period</small></article>)}</section>
      <section className="dash-panels"><article className="revenue-panel"><div className="panel-head"><div><p>Revenue overview</p><h2>₹3,18,240</h2></div><span className="gain">+18.2%</span></div><MiniBars/><div className="axis"><span>Sep 01</span><span>Sep 08</span><span>Sep 15</span><span>Sep 22</span><span>Sep 30</span></div></article>
      <article className="goal-panel"><p>Monthly target</p><div className="ring"><span><strong>84%</strong><small>₹8.4L of ₹10L</small></span></div><div className="goal-foot"><span><i/>Completed</span><strong>₹1.6L left</strong></div></article></section>
      <section className="orders"><div className="panel-head"><div><p>Recent orders</p><span>Latest customer transactions</span></div><button>View all <ChevronRight size={16}/></button></div><div className="table-wrap"><table><thead><tr><th>Order</th><th>Customer</th><th>Product</th><th>Amount</th><th>Status</th></tr></thead><tbody>{visible.map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i}>{i===1?<><span className="avatar">{c.split(' ').map(x=>x[0]).join('')}</span>{c}</>:i===4?<span className={`status ${c.toLowerCase()}`}>{c}</span>:c}</td>)}</tr>)}</tbody></table></div></section>
      </div>
    </main>
  </div>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><Dashboard/></React.StrictMode>)
