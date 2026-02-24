import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Background from './components/Background';
import BootSequence from './components/BootSequence';
import StatusBar from './components/StatusBar';
import TerminalOutput from './components/TerminalOutput';
import MobileShortcuts from './components/MobileShortcuts';
import MatrixRain from './components/MatrixRain';
import GlitchText from './components/GlitchText';
import { playKeystroke, playError, playSuccess, playOutput, playCommandEnter } from './utils/sound';
import { Command, CommandType, ThemeName, FileSystemNode } from './types';
import { HELP_TEXT, FILE_SYSTEM, HOSTNAMES, PROJECTS } from './constants';
import { ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState<string[]>(['~']);
  const [theme, setTheme] = useState<ThemeName>('green');
  const [matrixMode, setMatrixMode] = useState(false);
  const [currentHost, setCurrentHost] = useState(HOSTNAMES[0]);
  const [isGlitching, setIsGlitching] = useState(false);
  
  // Refs to access latest state inside closures (like handleCommand stored in history)
  const currentPathRef = useRef(currentPath);
  const currentHostRef = useRef(currentHost);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync refs with state
  useEffect(() => { currentPathRef.current = currentPath; }, [currentPath]);
  useEffect(() => { currentHostRef.current = currentHost; }, [currentHost]);

  // Auto-scroll to bottom when history changes
  useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [history]);

  // Handle Theme Changes via CSS Variables
  useEffect(() => {
    const root = document.documentElement;
    const colors: Record<ThemeName, string> = {
        green: '#10b981',
        amber: '#f59e0b',
        blue: '#3b82f6',
        pink: '#ec4899',
        matrix: '#22c55e'
    };
    root.style.setProperty('--term-color', colors[theme]);
    root.style.setProperty('--term-color-dim', `${colors[theme]}33`);
  }, [theme]);

  // Focus input
  const handleContainerClick = (e: React.MouseEvent) => {
    if (window.getSelection()?.toString()) return;
    if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).tagName === 'BUTTON') return;
    inputRef.current?.focus({ preventScroll: true });
  };

  const getPathString = () => {
      const p = currentPathRef.current;
      // If root only
      if (p.length === 1 && p[0] === '~') return '~';
      // Join
      return p.join('/').replace('~/', '~/'); 
  };

  const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
  };

  // Robust Path Resolver (Case-Insensitive)
  const resolvePath = (pathStr: string): { node: FileSystemNode | null, resolvedPath: string[] } => {
      let targetPath: string[] = [];
      const currPath = currentPathRef.current;
      
      // 1. Handle Absolute vs Relative
      if (pathStr === '/' || pathStr === '~') {
          targetPath = ['~'];
      } else if (pathStr.startsWith('/')) {
         // Treat / as root relative for this sim
         targetPath = ['~', ...pathStr.split('/').filter(p => p)]; 
      } else if (pathStr.startsWith('~/')) {
          targetPath = ['~', ...pathStr.substring(2).split('/').filter(p => p)];
      } else {
         // Relative to current
         targetPath = [...currPath, ...pathStr.split('/').filter(p => p)];
      }

      // 2. Normalize (handle . and ..)
      const cleanPath: string[] = [];
      for (const p of targetPath) {
          if (p === '.') continue;
          if (p === '..') {
              // Can't go above root (~ is index 0)
              if (cleanPath.length > 1) cleanPath.pop();
          } else {
              cleanPath.push(p);
          }
      }

      // 3. Traverse File System (Case-Insensitive)
      let current: FileSystemNode = FILE_SYSTEM['~'];
      
      // If cleanPath is just ['~'], we are at root
      if (cleanPath.length === 1 && cleanPath[0] === '~') {
          return { node: current, resolvedPath: cleanPath };
      }

      // Skip first element since it is '~' and we started there
      for (let i = 1; i < cleanPath.length; i++) {
          const segment = cleanPath[i];
          if (!current.children) return { node: null, resolvedPath: cleanPath };
          
          // Find matching key case-insensitively
          const realKey = Object.keys(current.children).find(k => k.toLowerCase() === segment.toLowerCase());
          
          if (realKey) {
              current = current.children[realKey];
          } else {
              return { node: null, resolvedPath: cleanPath };
          }
      }

      return { node: current, resolvedPath: cleanPath };
  };

  const handleCommand = (cmdInput: string) => {
    const rawArgs = cmdInput.trim().split(/\s+/);
    const cmd = rawArgs[0].toLowerCase(); // Normalize command
    const args = rawArgs.slice(1);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let pathStr = getPathString();
    const hostUsed = currentHostRef.current;

    if (cmd === '') {
        setHistory(prev => [...prev, { cmd: '', output: null, time, path: pathStr, host: hostUsed }]);
        return;
    }

    let output: React.ReactNode = null;
    let newPath = currentPathRef.current;

    // --- ALIASES THAT ACT AS NAVIGATION ---
    if (cmd === 'projects') {
        const { node, resolvedPath } = resolvePath('~/projects');
        if (node && node.type === 'dir') {
             setCurrentPath(resolvedPath);
             newPath = resolvedPath;
             output = <TerminalOutput type="projects" soundEnabled={soundEnabled} onCommand={handleCommand} />;
             if (soundEnabled) playOutput();
             triggerGlitch(); // Effect on major transition
        }
    }
    else if (cmd === 'skills') {
        const { node, resolvedPath } = resolvePath('~/skills');
        if (node && node.type === 'dir') {
             setCurrentPath(resolvedPath);
             newPath = resolvedPath;
             output = <TerminalOutput type="top" soundEnabled={soundEnabled} onCommand={handleCommand} />;
             if (soundEnabled) playOutput();
             triggerGlitch(); // Effect on major transition
        }
    }
    else if (cmd === 'experience') {
         output = <TerminalOutput type="experience" soundEnabled={soundEnabled} onCommand={handleCommand} />;
         if (soundEnabled) playOutput();
         triggerGlitch();
    }
    else if (cmd === 'education') {
         output = <TerminalOutput type="education" soundEnabled={soundEnabled} onCommand={handleCommand} />;
         if (soundEnabled) playOutput();
         triggerGlitch();
    }
    else if (cmd === 'about') {
         output = <TerminalOutput type="about" soundEnabled={soundEnabled} onCommand={handleCommand} />;
    }
    else if (cmd === 'contact') {
         output = <TerminalOutput type="contact" soundEnabled={soundEnabled} onCommand={handleCommand} />;
    }
    else if (cmd === 'testimonials' || cmd === 'reviews') {
         output = <TerminalOutput type="testimonials" soundEnabled={soundEnabled} onCommand={handleCommand} />;
    }
    
    // --- BUILT-IN COMMANDS ---
    else if (cmd === CommandType.CD) {
        const target = args[0] || '~';
        const { node, resolvedPath } = resolvePath(target);
        
        if (node && node.type === 'dir') {
            setCurrentPath(resolvedPath);
            newPath = resolvedPath;
        } else {
            const errPath = target;
            output = <TerminalOutput type="error" data={`cd: ${errPath}: No such file or directory`} soundEnabled={soundEnabled} />;
            if (soundEnabled) playError();
            triggerGlitch(); // Glitch on error
        }
    }

    else if (cmd === CommandType.LS) {
        const target = args[0] || '.';
        const { node, resolvedPath } = resolvePath(target);
        
        const targetDirName = resolvedPath[resolvedPath.length - 1];
        const isProjectsDir = targetDirName === 'projects';
        const isSkillsDir = targetDirName === 'skills';

        if (args[0] && node && node.type === 'dir') {
             setCurrentPath(resolvedPath);
             newPath = resolvedPath;
        }

        if (node && node.type === 'dir') {
             if (isProjectsDir) {
                 output = <TerminalOutput type="projects" soundEnabled={soundEnabled} onCommand={handleCommand} />;
                 if (soundEnabled) playOutput();
                 triggerGlitch();
             } else if (isSkillsDir) {
                 output = <TerminalOutput type="top" soundEnabled={soundEnabled} onCommand={handleCommand} />;
                 if (soundEnabled) playOutput();
                 triggerGlitch();
             } else {
                 if (node.children) {
                     const items = Object.entries(node.children).map(([name, n]) => ({ name, type: n.type }));
                     output = <TerminalOutput type="ls" data={items} soundEnabled={soundEnabled} />;
                     if (soundEnabled) playOutput();
                 }
             }
        } else if (node && node.type !== 'dir') {
             output = <TerminalOutput type="success" data={args[0]} soundEnabled={soundEnabled} />;
        } else {
             output = <TerminalOutput type="error" data={`ls: cannot access '${target}': No such file or directory`} soundEnabled={soundEnabled} />;
             if (soundEnabled) playError();
             triggerGlitch();
        }
    }

    // --- FILE/EXEC HANDLING ---
    else {
        const isExplicitExec = cmd.includes('/');
        const { node } = resolvePath(cmd);

        if (node && node.type === 'exec') {
            const parts = cmd.split('/');
            const fileName = parts[parts.length - 1];
            
            const project = PROJECTS.find(p => p.name.toLowerCase() === fileName.toLowerCase());
            
            if (project) {
                output = <TerminalOutput type="project-detail" data={project} soundEnabled={soundEnabled} onCommand={handleCommand} />;
                if (soundEnabled) playOutput();
                triggerGlitch();
            } else {
                output = <TerminalOutput type="success" data={`Executing ${fileName}...`} soundEnabled={soundEnabled} />;
            }
        }
        else if (isExplicitExec && !node) {
            output = <TerminalOutput type="error" data={`bash: ${cmd}: No such file or directory`} soundEnabled={soundEnabled} />;
            if (soundEnabled) playError();
            triggerGlitch();
        }
        else if (cmd === CommandType.CAT) {
            if (!args[0]) {
                 output = <TerminalOutput type="error" data="Usage: cat <filename>" soundEnabled={soundEnabled} />;
                 if (soundEnabled) playError();
                 triggerGlitch();
            } else {
                const { node } = resolvePath(args[0]);
                let targetNode = node;
                
                if (!targetNode) {
                     const { node: txtNode } = resolvePath(args[0] + '.txt');
                     if (txtNode) targetNode = txtNode;
                     else {
                         const { node: mdNode } = resolvePath(args[0] + '.md');
                         if (mdNode) targetNode = mdNode;
                         else {
                            const { node: jsonNode } = resolvePath(args[0] + '.json');
                            if (jsonNode) targetNode = jsonNode;
                            else {
                                const { node: logNode } = resolvePath(args[0] + '.log');
                                if (logNode) targetNode = logNode;
                            }
                         }
                     }
                }
    
                if (targetNode && targetNode.content === 'ABOUT_CONTENT_PLACEHOLDER') {
                    output = <TerminalOutput type="about" soundEnabled={soundEnabled} onCommand={handleCommand} />;
                } else if (targetNode && targetNode.content === 'CONTACT_CONTENT_PLACEHOLDER') {
                    output = <TerminalOutput type="contact" soundEnabled={soundEnabled} onCommand={handleCommand} />;
                } else if (targetNode && targetNode.content === 'EXPERIENCE_CONTENT_PLACEHOLDER') {
                    output = <TerminalOutput type="experience" soundEnabled={soundEnabled} onCommand={handleCommand} />;
                } else if (targetNode && targetNode.content === 'EDUCATION_CONTENT_PLACEHOLDER') {
                    output = <TerminalOutput type="education" soundEnabled={soundEnabled} onCommand={handleCommand} />;
                } else if (targetNode && targetNode.content === 'TESTIMONIALS_CONTENT_PLACEHOLDER') {
                    output = <TerminalOutput type="testimonials" soundEnabled={soundEnabled} onCommand={handleCommand} />;
                } else if (targetNode && targetNode.type === 'file') {
                    output = <TerminalOutput type="text" data={targetNode.content} soundEnabled={soundEnabled} />;
                } else if (targetNode && targetNode.type === 'exec') {
                     output = <TerminalOutput type="error" data={`cat: ${args[0]}: Cannot read binary file`} soundEnabled={soundEnabled} />;
                     triggerGlitch();
                } else {
                    output = <TerminalOutput type="error" data={`cat: ${args[0]}: No such file or directory`} soundEnabled={soundEnabled} />;
                    if (soundEnabled) playError();
                    triggerGlitch();
                }
            }
        }
        else if (cmd === CommandType.CLEAR) {
            setHistory([]);
            const nextHost = HOSTNAMES[Math.floor(Math.random() * HOSTNAMES.length)];
            setCurrentHost(nextHost);
            triggerGlitch(); // Glitch on clear
            return;
        }
        else if (cmd === CommandType.HELP) {
            output = <TerminalOutput type="text" data={HELP_TEXT} soundEnabled={soundEnabled} />;
        }
        else if (cmd === CommandType.WHOAMI) {
            output = <TerminalOutput type="whoami" soundEnabled={soundEnabled} />;
            if (soundEnabled) playOutput();
        }
        else if (cmd === CommandType.THEME) {
             if (args.length > 0 && ['green', 'amber', 'blue', 'pink'].includes(args[0])) {
                setTheme(args[0] as ThemeName);
                output = <TerminalOutput type="success" data={`Theme set to ${args[0]}`} soundEnabled={soundEnabled} />;
                if (soundEnabled) playSuccess();
                triggerGlitch(); // Glitch on theme switch
            } else {
                output = <TerminalOutput type="error" data="Usage: theme [green|amber|blue|pink]" soundEnabled={soundEnabled} />;
            }
        }
        else if (cmd === CommandType.MATRIX) {
            setMatrixMode(!matrixMode);
            output = <TerminalOutput type="success" data={`Matrix mode ${!matrixMode ? 'ENABLED' : 'DISABLED'}`} soundEnabled={soundEnabled} />;
            triggerGlitch(); // Glitch on matrix toggle
        }
        else if (cmd === CommandType.SOCIAL) {
            output = <TerminalOutput type="social" soundEnabled={soundEnabled} />;
        }
        else if (cmd === CommandType.TOP) {
            output = <TerminalOutput type="top" soundEnabled={soundEnabled} onCommand={handleCommand} />;
            if (soundEnabled) playOutput();
            triggerGlitch();
        }
        else {
            output = <TerminalOutput type="error" data={`bash: ${cmd}: command not found`} soundEnabled={soundEnabled} />;
            if (soundEnabled) playError();
            triggerGlitch();
        }
    }

    const displayPath = newPath.join('/').replace('~/', '~/');
    setHistory(prev => [...prev, { cmd: cmdInput, output: output, time, path: displayPath, host: hostUsed }]);
    
    if (Math.random() > 0.8) {
        const nextHost = HOSTNAMES[Math.floor(Math.random() * HOSTNAMES.length)];
        setCurrentHost(nextHost);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (soundEnabled) playCommandEnter();
    handleCommand(input);
    setInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (soundEnabled) playKeystroke();

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < history.length) {
            setHistoryIndex(newIndex);
            setInput(history[history.length - 1 - newIndex].cmd);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex].cmd);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        
        // Find the last token (everything after the last space)
        const match = input.match(/(\S+)$/);
        const currentToken = match ? match[0] : '';
        const textBeforeToken = input.slice(0, input.length - currentToken.length);
        
        // Use a set to avoid duplicates
        let candidates = new Set<string>();

        // 1. Command Autocomplete (only if it's the first word)
        // Check if there is no text before token, or only spaces
        if (!textBeforeToken.trim()) {
            Object.values(CommandType).forEach(cmd => {
                if (cmd !== CommandType.UNKNOWN && cmd.startsWith(currentToken.toLowerCase())) {
                    candidates.add(cmd);
                }
            });
        }

        // 2. File System Autocomplete
        // Determine directory to search and prefix to match
        
        let searchDir = '.';
        let filePrefix = currentToken;
        let pathPrefix = ''; // The part of the path before the filePrefix (e.g. "projects/")

        const lastSlash = currentToken.lastIndexOf('/');
        if (lastSlash !== -1) {
            searchDir = currentToken.substring(0, lastSlash + 1);
            filePrefix = currentToken.substring(lastSlash + 1);
            pathPrefix = currentToken.substring(0, lastSlash + 1);
        }

        const { node } = resolvePath(searchDir);
        
        if (node && node.children) {
            Object.keys(node.children).forEach(fileName => {
                if (fileName.toLowerCase().startsWith(filePrefix.toLowerCase())) {
                     const isDir = node.children![fileName].type === 'dir';
                     // Add the full relative path segment
                     candidates.add(pathPrefix + fileName + (isDir ? '/' : ''));
                }
            });
        }
        
        const candidateArray = Array.from(candidates).sort();

        if (candidateArray.length === 1) {
            // Single match: complete it
            setInput(textBeforeToken + candidateArray[0]);
        } else if (candidateArray.length > 1) {
            // Multiple matches
            // 1. Find common prefix
            const commonPrefix = candidateArray.reduce((acc, curr) => {
                let i = 0;
                while (i < acc.length && i < curr.length && acc[i] === curr[i]) i++;
                return acc.substring(0, i);
            });

            // If common prefix adds information, update input
            if (commonPrefix.length > currentToken.length) {
                setInput(textBeforeToken + commonPrefix);
            } else {
                // Common prefix didn't help (ambiguous next char). List options.
                const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const currentPathStr = getPathString();
                const currentHostStr = currentHostRef.current;
                
                // Show candidates in history but DO NOT execute command
                setHistory(prev => [
                    ...prev,
                    {
                        cmd: input, 
                        time,
                        path: currentPathStr,
                        host: currentHostStr,
                        output: (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-gray-400 mt-1 mb-2">
                                {candidateArray.map(c => <div key={c}>{c}</div>)}
                            </div>
                        )
                    }
                ]);
            }
        }
    }
  };

  if (!booted) {
    return (
      <div className="relative w-full h-screen bg-term-bg overflow-hidden crt animate-turn-on">
        <Background />
        <BootSequence onComplete={() => setBooted(true)} soundEnabled={soundEnabled} />
      </div>
    );
  }

  return (
    <div 
      className={`relative w-full h-screen bg-term-bg text-term-main font-mono overflow-hidden crt flex flex-col animate-turn-on ${isGlitching ? 'animate-glitch' : ''}`}
      onClick={handleContainerClick}
      ref={containerRef}
    >
      <Background />
      {matrixMode && <MatrixRain />}
      
      {/* Main Terminal Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 pb-16 custom-scrollbar z-10">
        
        {/* Welcome Banner */}
        <div className="mb-8 select-none opacity-80">
          <pre className="hidden sm:block text-[10px] sm:text-xs leading-none mb-4 crt-flicker font-bold">
{`
  ____  _   _ ___ ____      _     _   
 / ___|| | | |_ _|  _ \\    / \\   | |  
 \\___ \\| |_| || || |_) |  / _ \\  | |  
  ___) |  _  || ||  _ <  / ___ \\ | |___ 
 |____/|_| |_|___|_| \\_\\/_/   \\_\\_____|
                                       
`}
          <GlitchText text=" SYSTEM READY." interval={2500} probability={0.6} />
          </pre>
          <div className="text-sm text-gray-400 mb-2">SHIRAJ_OS Interactive Shell v2.4 [Protected]</div>
          <div className="text-sm text-gray-500">Type <span className="text-white font-bold">'help'</span> for a list of commands.</div>
        </div>

        {/* History Output */}
        <div className="space-y-4">
          {history.map((entry, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm text-gray-400 flex-wrap">
                 <span className="opacity-50">[{entry.time}]</span>
                 <span className="text-term-main font-bold">guest@{entry.host}:{entry.path}$</span>
                 <span className="text-gray-100">{entry.cmd}</span>
              </div>
              {entry.output && (
                  <div className="ml-0 sm:ml-4 text-sm sm:text-base mb-2">
                      {entry.output}
                  </div>
              )}
            </div>
          ))}
        </div>

        {/* Current Input */}
        <div className="mt-4">
            <MobileShortcuts onCommand={(cmd) => {
                if(soundEnabled) playCommandEnter();
                handleCommand(cmd);
            }} />
            
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <ChevronRight size={18} className="text-term-main animate-pulse flex-shrink-0" />
                <span className="text-term-main font-bold hidden sm:inline">guest@{currentHost}:{getPathString()}$</span>
                <div className="relative flex-1">
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        autoComplete="off"
                        spellCheck="false"
                        className="w-full bg-transparent border-none outline-none text-gray-100 font-mono text-base placeholder-gray-700/50 caret-term-main"
                        placeholder=""
                    />
                </div>
            </form>
        </div>

        <div ref={bottomRef} />
      </div>

      <StatusBar soundEnabled={soundEnabled} toggleSound={() => setSoundEnabled(!soundEnabled)} />
    </div>
  );
};

export default App;