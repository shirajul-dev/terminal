import React, { useState, useEffect, useRef } from 'react';
import { Project, Skill, Social, Experience, Education } from '../types';
import { PROJECTS, SKILLS, SOCIALS, TESTIMONIALS, EXPERIENCES, EDUCATION, TECH_STACK_ICONS } from '../constants';
import { Terminal as TerminalIcon, ShieldCheck, Activity, Server, Zap, Globe, Github, Linkedin, Mail, Phone, MapPin, Hash, User, Layout, Cloud, Database, Cpu, CheckCircle, Layers, Smartphone, Code, Play, Star, MessageSquare, Loader, Briefcase, GraduationCap, Calendar, Mail as MailIcon, ArrowRight } from 'lucide-react';
import Typewriter from './Typewriter';
import GlitchText from './GlitchText';
import { playPixelBlip, playSuccess } from '../utils/sound';

interface TerminalOutputProps {
  type: string;
  data?: any; // For passing specific data like 'ls' content or file content
  soundEnabled?: boolean;
  onCommand?: (cmd: string) => void;
}

const SkillDashboard: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const categories = Array.from(new Set(SKILLS.map(s => s.category)));

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const getCategoryIcon = (cat: string) => {
        switch(cat) {
            case 'Backend': return <Server size={14} className="text-term-main" />;
            case 'Frontend': return <Layout size={14} className="text-blue-400" />;
            case 'DevOps': return <Cloud size={14} className="text-purple-400" />;
            case 'Database': return <Database size={14} className="text-amber-400" />;
            default: return <Cpu size={14} />;
        }
    };

    return (
        <div className="animate-fade-in max-w-5xl">
             <div className="border-b border-gray-800 pb-4 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                    <div className="flex items-center gap-2 text-term-main mb-1">
                        <Activity size={18} className="animate-pulse"/>
                        <h3 className="text-xl font-bold tracking-wider">SYSTEM_MODULES // SKILLS</h3>
                    </div>
                    <div className="text-xs text-gray-500 font-mono">Optimized for High-Performance Architecture</div>
                </div>
                <div className="flex gap-4 text-xs font-mono text-gray-600">
                    <div>UPTIME: <span className="text-gray-400">99.99%</span></div>
                    <div>MEMORY: <span className="text-gray-400">16GB / 32GB</span></div>
                    <div>LOAD: <span className="text-term-main">LOW</span></div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {categories.map(cat => (
                    <div key={cat} className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-400 border-b border-gray-800 pb-2 mb-2">
                            {getCategoryIcon(cat)}
                            <GlitchText text={`// ${cat.toUpperCase()}_ENGINE`} interval={5000} />
                        </div>
                        
                        {SKILLS.filter(s => s.category === cat).map((skill, idx) => (
                            <div key={skill.name} className="group">
                                <div className="flex justify-between items-center mb-1.5">
                                    <span className="font-bold text-gray-300 group-hover:text-term-main transition-colors text-sm">{skill.name}</span>
                                    <span className="text-xs font-mono text-gray-600 group-hover:text-term-main/70">
                                        {mounted ? `${skill.level}%` : '0%'}
                                    </span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden relative">
                                    {/* Background Grid Pattern in bar */}
                                    <div className="absolute inset-0 opacity-20" 
                                         style={{backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.5) 50%)', backgroundSize: '4px 100%'}}>
                                    </div>
                                    
                                    <div 
                                        className="h-full bg-term-main relative transition-all duration-1000 ease-out rounded-full group-hover:shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                        style={{ width: mounted ? `${skill.level}%` : '0%' }}
                                    >
                                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
             </div>

             <div className="mt-8 pt-6 border-t border-gray-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: 'TOTAL_MODULES', value: SKILLS.length },
                    { label: 'AVG_OPTIMIZATION', value: (SKILLS.reduce((a, b) => a + b.level, 0) / SKILLS.length).toFixed(1) + '%' },
                    { label: 'KERNEL_VER', value: 'v5.14.0' },
                    { label: 'SECURITY_LEVEL', value: 'MAXIMUM' }
                ].map(stat => (
                    <div key={stat.label} className="bg-gray-900/30 p-3 border-l-2 border-gray-800 hover:border-term-main transition-colors">
                        <div className="text-[10px] text-gray-500 mb-1">{stat.label}</div>
                        <div className="text-sm font-bold text-gray-200">{stat.value}</div>
                    </div>
                ))}
             </div>
        </div>
    );
};

const ExperienceLog: React.FC<{ soundEnabled?: boolean }> = ({ soundEnabled }) => {
    return (
        <div className="animate-fade-in max-w-4xl space-y-8 relative">
            {/* Vertical Line */}
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-800"></div>

            <div className="flex items-center gap-2 text-term-main mb-6 pl-10 relative">
                 <div className="absolute left-[9px] top-1/2 -translate-y-1/2 w-3 h-3 bg-term-main rounded-full shadow-[0_0_10px_var(--term-color)]"></div>
                 <Briefcase size={18} />
                 <h3 className="text-xl font-bold tracking-wider">CAREER_LOGS</h3>
            </div>

            {EXPERIENCES.map((exp, index) => (
                <div key={index} className="relative pl-10 group">
                    {/* Node Dot */}
                    <div className="absolute left-[9px] top-6 w-3 h-3 rounded-full bg-gray-900 border-2 border-gray-700 group-hover:border-term-main group-hover:bg-term-main transition-all"></div>
                    
                    <div className="bg-gray-900/40 p-5 rounded border border-gray-800/50 hover:border-term-main/50 transition-colors backdrop-blur-sm">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                            <div>
                                <h4 className="text-lg font-bold text-white group-hover:text-term-main transition-colors">
                                    {exp.role}
                                </h4>
                                <div className="text-blue-400 font-mono text-sm">{exp.company}</div>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-gray-900 px-2 py-1 rounded border border-gray-800 mt-2 md:mt-0">
                                <Calendar size={12} />
                                {exp.period}
                            </div>
                        </div>

                        <ul className="space-y-2 mb-4">
                            {exp.description.map((desc, i) => (
                                <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                                    <span className="text-term-main mt-1.5 text-[8px]">&gt;</span>
                                    <span>{desc}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-800/50">
                            {exp.tech.map(t => (
                                <span key={t} className="text-[10px] text-gray-400 font-mono bg-gray-800/50 px-2 py-0.5 rounded">
                                    #{t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
            
            <div className="pl-10 text-xs text-gray-600 font-mono">
                [END_OF_LOG]
            </div>
        </div>
    );
};

const EducationHistory: React.FC<{ soundEnabled?: boolean }> = ({ soundEnabled }) => {
    return (
        <div className="animate-fade-in max-w-4xl space-y-6">
            <div className="flex items-center gap-2 text-term-main border-b border-gray-800 pb-4 mb-6">
                 <GraduationCap size={18} />
                 <h3 className="text-xl font-bold tracking-wider">ACADEMIC_RECORDS</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {EDUCATION.map((edu, index) => (
                    <div key={index} className="bg-gray-900/30 p-6 rounded border-l-4 border-gray-700 hover:border-term-main transition-colors group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <GraduationCap size={64} />
                        </div>
                        
                        <div className="relative z-10">
                            <div className="text-xs font-mono text-term-main mb-2 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-term-main rounded-full"></span>
                                {edu.year}
                            </div>
                            <h4 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                                {edu.degree}
                            </h4>
                            <div className="text-gray-400 font-medium mb-3 text-sm">
                                {edu.institution}
                            </div>
                            <p className="text-gray-500 text-xs leading-relaxed font-mono border-t border-gray-800 pt-3">
                                {edu.details}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CreativeContact: React.FC = () => {
    return (
        <div className="animate-fade-in max-w-2xl mt-4">
            {/* Code Block Card */}
            <div className="bg-[#0d1117] rounded-lg border border-gray-700/50 overflow-hidden shadow-2xl relative">
                {/* Window Controls */}
                <div className="bg-[#161b22] px-4 py-2 border-b border-gray-700/50 flex items-center justify-between">
                     <div className="flex gap-2">
                         <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                         <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                         <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                     </div>
                     <div className="text-[10px] text-gray-500 font-mono">contact.js</div>
                </div>

                <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                    <div className="flex gap-4">
                        {/* Line Numbers */}
                        <div className="flex flex-col text-gray-600 select-none text-right min-w-[20px]">
                            {Array.from({length: 10}).map((_, i) => <span key={i}>{i+1}</span>)}
                        </div>
                        
                        {/* Code Content */}
                        <div className="flex-1">
                            <div className="text-gray-400 mb-4">
                                <span className="text-term-main">{'->'}</span> <span className="text-gray-100 font-bold">Let's Build Something Together</span>
                            </div>
                            
                            <div className="text-gray-500 italic mb-6">
                                {'// I\'m always open to discussing new projects, creative ideas or'}<br/>
                                {'// opportunities to be part of your visions.'}
                            </div>
                            
                            <div className="mb-2">
                                <span className="text-[#ff7b72]">const</span> <span className="text-[#d2a8ff]">status</span> <span className="text-[#ff7b72]">=</span> <span className="text-[#a5d6ff]">"Open for opportunities"</span><span className="text-gray-400">;</span>
                            </div>
                            <div className="mb-8">
                                <span className="text-[#ff7b72]">const</span> <span className="text-[#d2a8ff]">email</span> <span className="text-[#ff7b72]">=</span> <span className="text-[#a5d6ff]">"contact@shirajul.dev"</span><span className="text-gray-400">;</span>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <a 
                                    href="mailto:contact@shirajul.dev"
                                    className="group flex items-center gap-2 bg-[#238636] hover:bg-[#2ea043] text-white px-4 py-2 rounded text-xs font-bold transition-all hover:scale-105 active:scale-95 no-underline"
                                >
                                    <MailIcon size={14} />
                                    <span>sh send_mail.sh</span>
                                </a>
                                
                                <a 
                                    href="https://linkedin.com/" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="text-gray-400 hover:text-white text-xs flex items-center gap-1 transition-colors no-underline"
                                >
                                    <ArrowRight size={14} />
                                    <span>Connect on LinkedIn</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-4 text-[10px] text-gray-600 font-mono text-center">
                Press [CMD] + [CLICK] to execute script
            </div>
        </div>
    );
};

const ProjectsView: React.FC<{ soundEnabled?: boolean; onCommand?: (cmd: string) => void }> = ({ soundEnabled, onCommand }) => {
    const [loading, setLoading] = useState(true);
    const [logs, setLogs] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let mounted = true;
        
        // Simulation Sequence
        const steps = [
            { time: 100, msg: "Initiating secure handshake...", prog: 5 },
            { time: 400, msg: "Resolving host api.shirajul.dev...", prog: 15 },
            { time: 800, msg: "Connected to production-db-shard-01", prog: 30 },
            { time: 1100, msg: "Fetching project indices...", prog: 45 },
            { time: 1400, msg: `Retrieved ${PROJECTS.length} project records`, prog: 60 },
            { time: 1700, msg: "Downloading assets (thumbnails, metadata)...", prog: 80 },
            { time: 2000, msg: "Compiling view components...", prog: 95 },
            { time: 2200, msg: "Rendering interface...", prog: 100 }
        ];

        const timeouts: ReturnType<typeof setTimeout>[] = [];

        steps.forEach(step => {
            const t = setTimeout(() => {
                if(!mounted) return;
                setLogs(prev => [...prev, `> [${new Date().toLocaleTimeString([], {hour12: false, fractionalSecondDigits: 3 } as any)}] ${step.msg}`]);
                setProgress(step.prog);
                if (soundEnabled) playPixelBlip();
            }, step.time);
            timeouts.push(t);
        });

        // Finish
        const finishT = setTimeout(() => {
            if(!mounted) return;
            setLoading(false);
            if(soundEnabled) playSuccess();
        }, 2400);
        timeouts.push(finishT);

        return () => {
            mounted = false;
            timeouts.forEach(clearTimeout);
        };
    }, []);

    if (loading) {
        return (
            <div className="font-mono text-sm space-y-3 max-w-lg animate-fade-in text-gray-400 my-4 border border-gray-800/50 bg-gray-900/30 p-4 rounded">
                <div className="flex items-center gap-2 text-term-main border-b border-gray-800 pb-2 mb-2">
                   <Loader className="animate-spin" size={16} />
                   <span className="font-bold tracking-wider text-xs">ESTABLISHING DATALINK</span>
                </div>
                
                <div className="h-32 overflow-y-auto custom-scrollbar space-y-1 text-xs">
                    {logs.map((log, i) => (
                        <div key={i} className="truncate">{log}</div>
                    ))}
                    <div className="animate-pulse">_</div>
                </div>

                <div className="mt-2 pt-2 border-t border-gray-800/50">
                    <div className="flex justify-between text-[10px] mb-1 text-gray-500 font-bold">
                        <span>TRANSFER RATE: 128 MB/s</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded overflow-hidden">
                        <div 
                            className="h-full bg-term-main transition-all duration-300 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {PROJECTS.map((project) => (
            <div 
              key={project.name} 
              onClick={() => onCommand && onCommand(`~/projects/${project.name}`)}
              className="border border-gray-800 bg-gray-900/50 p-4 rounded hover:border-term-main transition-colors group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <TerminalIcon size={64} />
              </div>
              <div className="flex justify-between items-start mb-2 relative z-10">
                <h4 className="text-lg font-bold text-term-main group-hover:text-white transition-colors">./{project.name}</h4>
                <span className="text-[10px] uppercase border border-gray-700 px-1 text-gray-400">{project.type}</span>
              </div>
              <p className="text-sm text-gray-400 mb-4 h-10 line-clamp-2 relative z-10">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                {project.stack.slice(0, 3).map(tech => (
                  <span key={tech} className="text-xs text-term-main bg-term-dim px-2 py-0.5 rounded">
                    {tech}
                  </span>
                ))}
              </div>

              <ul className="text-xs text-gray-500 space-y-1 relative z-10 font-mono">
                {project.features.slice(0, 2).map(feat => (
                  <li key={feat}>&gt; {feat}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
    );
};

const ProjectDetail: React.FC<{ project: Project; soundEnabled?: boolean; onCommand?: (cmd: string) => void }> = ({ project, soundEnabled, onCommand }) => {
    const [logs, setLogs] = useState<string[]>([]);
    const logsEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const bootLogs = [
             `Initializing ${project.name} kernel...`,
             `[INFO] Loading ${project.stack[0]} driver... OK`,
             `[INFO] Mounting ${project.stack[1] || 'Module'}... OK`,
             `[NET] Connecting to ${project.type} interface...`,
             `[SEC] Verifying SSL/TLS certificates...`,
             `[DATA] Syncing with database nodes...`,
             `[SUCCESS] ${project.name} deployed successfully on port ${Math.floor(Math.random() * 8000) + 2000}.`,
             `[READY] Waiting for incoming traffic...`
        ];
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < bootLogs.length) {
                setLogs(prev => [...prev, bootLogs[i]]);
                i++;
            } else {
                clearInterval(timer);
            }
        }, 300);
        return () => clearInterval(timer);
    }, [project]);

    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const getTypeIcon = () => {
        switch(project.type) {
            case 'Mobile': return <Smartphone size={24} />;
            case 'Web': return <Globe size={24} />;
            case 'Backend': return <Server size={24} />;
            default: return <Code size={24} />;
        }
    }

    return (
        <div className="animate-fade-in my-6 p-1 relative group">
             {/* Glowing Border Container */}
             <div className="absolute inset-0 bg-gradient-to-r from-term-main/20 via-transparent to-term-main/20 rounded opacity-20 group-hover:opacity-40 transition-opacity"></div>
             <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-term-main"></div>
             <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-term-main"></div>
             <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-term-main"></div>
             <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-term-main"></div>

             <div className="bg-gray-900/40 p-6 rounded backdrop-blur-sm relative overflow-hidden">
                {/* Background Watermark */}
                <div className="absolute -right-8 -top-8 text-gray-800/20 transform rotate-12 pointer-events-none">
                    <TerminalIcon size={200} />
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 relative z-10">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-term-main/10 border border-term-main/30 rounded text-term-main shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                            {getTypeIcon()}
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white tracking-tight mb-1 flex items-center gap-3">
                                <GlitchText text={project.name.toUpperCase()} interval={4000} />
                                <span className="text-[10px] px-2 py-0.5 rounded-full border border-term-main text-term-main bg-term-main/5 tracking-widest uppercase">
                                    v{Math.floor(Math.random() * 4)}.0
                                </span>
                            </h2>
                            <p className="text-gray-400 text-sm font-mono flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-term-main animate-pulse"></span>
                                SYSTEM_STATUS: ONLINE
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-end text-xs text-gray-500 font-mono">
                        <div>ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                        <div>UPTIME: {Math.floor(Math.random() * 700)}h {Math.floor(Math.random() * 60)}m</div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                    
                    {/* Description & Features */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-black/30 p-4 rounded border-l-2 border-gray-700">
                             <div className="text-xs text-gray-500 mb-2 font-bold flex items-center gap-2">
                                <Activity size={12} /> MISSION_OBJECTIVE
                             </div>
                             <div className="text-gray-300 text-sm leading-relaxed font-mono">
                                <Typewriter text={project.description} speed={20} soundEnabled={soundEnabled} />
                             </div>
                        </div>

                        <div>
                            <div className="text-xs text-gray-500 mb-3 font-bold flex items-center gap-2">
                                <Zap size={12} /> CORE_CAPABILITIES
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {project.features.map((feat, i) => (
                                    <div key={i} className="flex items-center gap-3 text-xs text-gray-300 bg-gray-800/30 p-2 rounded hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-700">
                                        <CheckCircle size={14} className="text-term-main" />
                                        {feat}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Stack & Console */}
                    <div className="space-y-6">
                         <div>
                            <div className="text-xs text-gray-500 mb-3 font-bold flex items-center gap-2">
                                <Layers size={12} /> TECH_STACK
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.stack.map(tech => (
                                    <div key={tech} className="px-2 py-1 bg-gray-900 border border-gray-700 text-term-main text-[10px] font-mono rounded flex items-center gap-1.5">
                                        <div className="w-1 h-1 bg-white rounded-full"></div>
                                        {tech}
                                    </div>
                                ))}
                            </div>
                         </div>

                         <div className="rounded border border-gray-800 bg-black p-3 font-mono text-[10px] h-40 overflow-hidden relative shadow-inner">
                            <div className="absolute top-0 left-0 right-0 h-4 bg-gray-900 border-b border-gray-800 flex items-center px-2 gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                                <span className="ml-2 text-gray-600">boot_log.sh</span>
                            </div>
                            <div className="mt-4 space-y-1 h-full overflow-y-auto custom-scrollbar pb-2">
                                {logs.map((log, i) => (
                                    <div key={i} className="text-gray-400">
                                        <span className="text-blue-500 mr-2">$</span>
                                        {log}
                                    </div>
                                ))}
                                {logs.length === 8 && (
                                    <div className="flex items-center gap-1 text-term-main animate-pulse">
                                        <span>_</span>
                                    </div>
                                )}
                                <div ref={logsEndRef}></div>
                            </div>
                         </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-8 pt-6 border-t border-gray-800 flex flex-wrap gap-4 relative z-10">
                    <button className="flex items-center gap-2 bg-term-main text-black px-4 py-2 text-xs font-bold rounded hover:bg-white transition-colors">
                        <Play size={14} /> INITIALIZE_DEMO
                    </button>
                    <button className="flex items-center gap-2 bg-transparent border border-gray-700 text-gray-300 px-4 py-2 text-xs font-bold rounded hover:border-gray-500 transition-colors">
                        <Code size={14} /> VIEW_SOURCE
                    </button>
                </div>
             </div>
        </div>
    )
}

const TestimonialsLog: React.FC<{ soundEnabled?: boolean }> = ({ soundEnabled }) => {
    return (
        <div className="animate-fade-in space-y-6 max-w-4xl">
            <div className="flex items-center gap-2 text-term-main border-b border-gray-800 pb-2">
                <MessageSquare size={18} className="animate-pulse" />
                <h3 className="text-lg font-bold tracking-wider">DECRYPTING CLIENT TRANSMISSIONS...</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
                {TESTIMONIALS.map((t, i) => (
                    <div key={i} className="relative pl-6 border-l border-gray-800 hover:border-term-main transition-colors group">
                        {/* Timeline node */}
                        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-gray-800 group-hover:bg-term-main transition-colors border border-black"></div>
                        
                        <div className="bg-gray-900/30 p-4 rounded border border-gray-800/50">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <div className="text-sm font-bold text-white">{t.name}</div>
                                    <div className="text-xs text-gray-500 font-mono">{t.role} @ {t.company}</div>
                                </div>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, starI) => (
                                        <Star key={starI} size={10} className={starI < t.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-700"} />
                                    ))}
                                </div>
                            </div>
                            
                            <div className="font-mono text-sm text-gray-300 leading-relaxed relative">
                                <span className="text-term-main/50 absolute -left-3 -top-1">"</span>
                                <Typewriter text={t.text} speed={10} soundEnabled={soundEnabled && i === 0} />
                                <span className="text-term-main/50 absolute -bottom-3 ml-1">"</span>
                            </div>
                            
                            <div className="mt-3 pt-2 border-t border-gray-800/50 flex justify-between items-center text-[10px] text-gray-600 font-mono">
                                <span>PACKET_ID: {Math.random().toString(16).substr(2, 8).toUpperCase()}</span>
                                <span>VERIFIED_SIGNATURE</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="text-xs text-gray-500 font-mono pt-4">
                {'>'} END_OF_TRANSMISSION
            </div>
        </div>
    );
};

const TerminalOutput: React.FC<TerminalOutputProps> = ({ type, data, soundEnabled, onCommand }) => {
  switch (type) {
    case 'text':
        return <div className="text-gray-300 whitespace-pre-wrap"><Typewriter text={data} speed={10} soundEnabled={soundEnabled} /></div>;
    
    case 'error':
        return <div className="text-term-error"><GlitchText text={`Error: ${data}`} interval={1000} duration={150} probability={0.4} /></div>;

    case 'success':
        return <div className="text-term-main">{data}</div>;

    case 'ls':
        return (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {data.map((item: any) => (
                    <div key={item.name} className={`${item.type === 'dir' ? 'text-blue-400 font-bold' : item.type === 'exec' ? 'text-term-main' : 'text-gray-300'}`}>
                        {item.name}{item.type === 'dir' ? '/' : item.type === 'exec' ? '*' : ''}
                    </div>
                ))}
            </div>
        );

    case 'about':
      return (
        <GlitchText as="div" probability={0.3} duration={150}>
            <div className="animate-fade-in flex flex-col-reverse md:flex-row gap-6 max-w-4xl">
                
                <div className="space-y-4 text-gray-300 flex-1 border-l-2 border-term-main pl-4">
                    <h3 className="text-xl text-term-main font-bold mb-2">
                        <Typewriter text="Md Shirajul Islam" speed={30} soundEnabled={soundEnabled} />
                        <span className="block text-sm font-normal text-gray-500 mt-1">// Full Stack Engineer & System Architect</span>
                    </h3>
                    <p className="leading-relaxed">
                    I am a Real-time System Builder and Backend Architecture Specialist. 
                    My expertise lies in crafting high-performance applications using <span className="text-white font-bold">Laravel</span> and <span className="text-white font-bold">Flutter</span>.
                    I manage complex server infrastructures, optimize databases, and build scalable production-ready systems.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm opacity-80">
                        <div className="flex items-center gap-2"><Server size={16} /> <span>Server & Infrastructure Manager</span></div>
                        <div className="flex items-center gap-2"><Activity size={16} /> <span>Real-time WebSocket Systems</span></div>
                        <div className="flex items-center gap-2"><ShieldCheck size={16} /> <span>Production-Grade Security</span></div>
                        <div className="flex items-center gap-2"><Zap size={16} /> <span>High-Frequency API Design</span></div>
                    </div>
                </div>

                <div className="w-32 h-32 md:w-40 md:h-40 relative flex-shrink-0 mb-4 md:mb-0 group">
                    {/* Creative Profile Image: Replace the src below with your actual photo URL */}
                    <div className="absolute inset-0 bg-term-main opacity-20 animate-pulse rounded-lg group-hover:opacity-10 transition-opacity"></div>
                    <img 
                        src="https://scontent.fdac134-1.fna.fbcdn.net/v/t39.30808-6/475814978_2426201957737793_1461147166847129481_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeFx9sri0jo3x6sTFqtX0lVzmYz5T9NZGW2ZjPlP01kZbVzr7fgaLWSVVK8G9gax0-6t7o1hNvgRDtVNqiwJHuQ8&_nc_ohc=LXsKAQhj_V8Q7kNvwFDGOHP&_nc_oc=AdnxnEvskYdDNpH83qgE1qbMmZlZYAl2iWa0xoQTseBCgV733JxnKmkLNVk0KxPv0hQ&_nc_zt=23&_nc_ht=scontent.fdac134-1.fna&_nc_gid=ZR-s01zeAJhqM17hrr4-kA&oh=00_AfvSyTmJjpor5v23Y_6clbgS3tUR4WRbh9rf1jbUnKbWFg&oe=69A3F46A" 
                        alt="Shirajul Profile" 
                        className="w-full h-full object-cover rounded-lg border-2 border-term-main/50 filter grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 text-term-main text-[10px] px-1 font-mono border border-term-main/30">
                        IMG_001.RAW
                    </div>
                    {/* Scanline overlay for image */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-10 opacity-30"></div>
                </div>

            </div>
        </GlitchText>
      );

    case 'top':
      return <SkillDashboard />;
    
    case 'experience':
        return <ExperienceLog soundEnabled={soundEnabled} />;

    case 'education':
        return <EducationHistory soundEnabled={soundEnabled} />;

    case 'project-detail':
      return <ProjectDetail project={data} soundEnabled={soundEnabled} onCommand={onCommand} />;

    case 'projects':
      return <ProjectsView soundEnabled={soundEnabled} onCommand={onCommand} />;

    case 'testimonials':
        return <TestimonialsLog soundEnabled={soundEnabled} />;

    case 'contact':
      return <CreativeContact />;

    case 'social':
        return (
            <div className="animate-fade-in">
                <p className="text-gray-400 mb-4">Retrieving public identity records...</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                    <div className="border border-gray-800 p-4 flex items-center gap-4 bg-gray-900/30">
                        <Phone className="text-term-main" />
                        <div>
                            <div className="text-xs text-gray-500">WhatsApp</div>
                            <div className="text-white">+8801709295489</div>
                        </div>
                    </div>
                    
                    <div className="border border-gray-800 p-4 flex items-center gap-4 bg-gray-900/30">
                        <MapPin className="text-term-main" />
                        <div>
                            <div className="text-xs text-gray-500">BASE OF OPERATIONS</div>
                            <div className="text-white">Tangail, BD</div>
                        </div>
                    </div>

                    {SOCIALS.map(social => (
                        <a 
                            key={social.platform}
                            href={social.url}
                            target="_blank"
                            rel="noreferrer"
                            className="border border-gray-800 p-4 flex items-center gap-4 bg-gray-900/30 hover:border-term-main hover:bg-gray-800 transition-all cursor-pointer no-underline"
                        >
                            {social.platform === 'GitHub' && <Github className="text-white" />}
                            {social.platform === 'LinkedIn' && <Linkedin className="text-blue-400" />}
                            {social.platform === 'Email' && <Mail className="text-red-400" />}
                            <div>
                                <div className="text-xs text-gray-500 uppercase">{social.platform}</div>
                                <div className="text-white text-sm">{social.user}</div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        );

    case 'whoami':
        return (
            <div className="animate-fade-in space-y-2">
                 <div className="flex items-center gap-3">
                    <User className="text-term-main" />
                    <p className="text-yellow-400 font-bold tracking-widest text-lg"><GlitchText text="ROOT ACCESS GRANTED" interval={2000} /></p>
                 </div>
                 <p className="text-xs text-gray-500 mt-1">User: Md Shirajul Islam (shiraj)</p>
                 <p className="text-xs text-gray-500">UID: 0 (root) GID: 0 (root) groups=0(root)</p>
                 <p className="text-xs text-gray-500">Location: /home/shiraj</p>
            </div>
        )
      
    default:
      return null;
  }
};

export default TerminalOutput;