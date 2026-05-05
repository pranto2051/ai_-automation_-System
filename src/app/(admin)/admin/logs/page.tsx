"use client";

import { motion } from "framer-motion";
import { Search, Terminal, Filter, Download, AlertCircle, Info, ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const logs = [
  { id: 1, time: "14:32:11.847", level: "info", source: "automation", user: "john@email.com", msg: "Task 'Daily LinkedIn' executed in 1.2s", duration: "1.2s" },
  { id: 2, time: "14:31:05.212", level: "error", source: "ai_service", user: "jane@email.com", msg: "Gemini API Error: Rate limit exceeded", duration: "4.5s" },
  { id: 3, time: "14:30:44.102", level: "warning", source: "auth", user: "mike@email.com", msg: "Multiple login attempts detected from new IP", duration: "240ms" },
  { id: 4, time: "14:28:12.990", level: "info", source: "cron", user: "System", msg: "Cleaning up expired sessions: 12 removed", duration: "850ms" },
  { id: 5, time: "14:25:33.456", level: "critical", source: "database", user: "System", msg: "Connection pool reached 95% capacity", duration: "12ms" },
];

const LevelBadge = ({ level }: { level: string }) => {
  const styles = {
    info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    error: "bg-red-500/10 text-red-400 border-red-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    critical: "bg-red-600/20 text-red-500 border-red-600/30 animate-pulse font-bold",
    debug: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  }[level];

  return (
    <span className={cn("px-2 py-0.5 rounded text-[10px] uppercase tracking-tighter border", styles)}>
      {level}
    </span>
  );
};

export default function LogsAdminPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-heading text-orange-500">System Logs</h1>
          <p className="text-sm text-text-muted">Real-time event monitoring and audit trails</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Live Tail: On</span>
          </div>
          <Button variant="secondary" size="sm" className="h-9">
            <Download size={14} className="mr-2" /> Export
          </Button>
        </div>
      </div>

      <div className="glass-card p-4 space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
            <Input 
              placeholder='Search logs... e.g. "status:failed platform:linkedin"' 
              className="pl-10 h-10 bg-white/5 border-white/10 font-mono text-sm"
            />
          </div>
          <Button variant="secondary" className="h-10">
            <Filter size={16} className="mr-2" /> Filters
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Errors Only", icon: AlertCircle, color: "text-red-500" },
            { label: "AI Events", icon: Terminal, color: "text-violet-500" },
            { label: "Auth", icon: ShieldAlert, color: "text-cyan-500" },
            { label: "System", icon: Info, color: "text-blue-500" },
          ].map(chip => (
            <button 
              key={chip.label}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-[10px] font-bold uppercase tracking-widest transition-all"
            >
              <chip.icon size={12} className={chip.color} />
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="w-[150px] text-[10px] uppercase tracking-widest font-bold">Timestamp</TableHead>
              <TableHead className="w-[100px] text-[10px] uppercase tracking-widest font-bold">Level</TableHead>
              <TableHead className="w-[120px] text-[10px] uppercase tracking-widest font-bold">Source</TableHead>
              <TableHead className="w-[150px] text-[10px] uppercase tracking-widest font-bold">User</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-bold">Message</TableHead>
              <TableHead className="w-[100px] text-[10px] uppercase tracking-widest font-bold text-right">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow 
                key={log.id} 
                className={cn(
                  "border-white/5 hover:bg-white/5 font-mono text-[11px] group cursor-pointer",
                  log.level === "critical" && "bg-red-500/[0.03]",
                  log.level === "error" && "bg-red-500/[0.01]"
                )}
              >
                <TableCell className="text-text-muted">{log.time}</TableCell>
                <TableCell><LevelBadge level={log.level} /></TableCell>
                <TableCell className="text-cyan-500/70">{log.source}</TableCell>
                <TableCell className="text-text-secondary">{log.user}</TableCell>
                <TableCell className="text-text-primary group-hover:text-white transition-colors">
                  {log.msg}
                </TableCell>
                <TableCell className="text-right text-amber-500/70">{log.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-text-muted px-2">
        <span>Showing 5 of 2,847 logs</span>
        <div className="flex gap-4">
          <button className="hover:text-white transition-colors disabled:opacity-30">Previous</button>
          <button className="hover:text-white transition-colors">Next</button>
        </div>
      </div>
    </motion.div>
  );
}
