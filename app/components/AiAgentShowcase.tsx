"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import type { AiAgent } from "../../lib/ai-agents";

type AiAgentShowcaseProps = {
  agents: AiAgent[];
  teamPath: string;
};

export function AiAgentShowcase({ agents, teamPath }: AiAgentShowcaseProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToAgent = useCallback((index: number) => {
    const rail = railRef.current;
    const card = rail?.querySelector<HTMLElement>(`[data-agent-index="${index}"]`);
    if (!rail || !card) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({ left: card.offsetLeft - rail.offsetLeft, behavior: reduceMotion ? "auto" : "smooth" });
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let frame = 0;
    const updateActiveAgent = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cards = Array.from(rail.querySelectorAll<HTMLElement>("[data-agent-index]"));
        if (!cards.length) return;
        const target = rail.scrollLeft + 8;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;
        cards.forEach((card, index) => {
          const leadingEdge = card.offsetLeft - rail.offsetLeft;
          const distance = Math.abs(leadingEdge - target);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });
        setActiveIndex(closestIndex);
      });
    };

    rail.addEventListener("scroll", updateActiveAgent, { passive: true });
    updateActiveAgent();
    return () => {
      cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", updateActiveAgent);
    };
  }, []);

  return (
    <div className="ai-agent-showcase">
      <div className="ai-agent-showcase-controls">
        <p aria-live="polite">
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          {agents[activeIndex]?.name} · {agents[activeIndex]?.practice}
        </p>
        <div>
          <button
            type="button"
            aria-label="Show previous AI specialist"
            disabled={activeIndex === 0}
            onClick={() => scrollToAgent(Math.max(0, activeIndex - 1))}
          >
            <ArrowLeft size={18} weight="regular" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Show next AI specialist"
            disabled={activeIndex === agents.length - 1}
            onClick={() => scrollToAgent(Math.min(agents.length - 1, activeIndex + 1))}
          >
            <ArrowRight size={18} weight="regular" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        className="ai-agent-list"
        ref={railRef}
        role="region"
        aria-label="Five AI specialist workstreams"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollToAgent(Math.max(0, activeIndex - 1));
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollToAgent(Math.min(agents.length - 1, activeIndex + 1));
          }
        }}
      >
        {agents.map((agent, index) => (
          <article
            className="ai-agent-row"
            data-agent-index={index}
            data-tone={agent.tone}
            key={agent.name}
            aria-label={`${agent.name}, ${agent.practice}`}
          >
            <Link
              className="ai-agent-card-link"
              href={`${teamPath}/${agent.slug}`}
              aria-label={`Open ${agent.name}'s AI specialist profile`}
            >
              <span className="sr-only">Open {agent.name}&apos;s AI specialist profile</span>
            </Link>
            <img
              src={agent.image}
              alt={`${agent.name}, FST ${agent.practice} AI agent`}
              width="128"
              height="128"
              loading="lazy"
              decoding="async"
            />
            <div className="ai-agent-details">
              <div className="ai-agent-intro">
                <div>
                  <span>{agent.practice}</span>
                  <h3>{agent.name}</h3>
                  <small>{agent.workflowCount} workflows · {agent.deliverableCount} deliverables</small>
                </div>
              </div>
              <div className="ai-agent-capacity" aria-label={`${agent.name} senior-equivalent planning capacity`}>
                <strong>{agent.averageCapacity}/{agent.optimisedCapacity}</strong>
                <span>
                  <b>Average / optimised</b>
                  {" "}
                  {agent.capacityRole}
                </span>
              </div>
              <p>{agent.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="ai-agent-pagination" aria-label="Choose an AI specialist">
        {agents.map((agent, index) => (
          <button
            type="button"
            key={agent.slug}
            aria-label={`Show ${agent.name}`}
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => scrollToAgent(index)}
          />
        ))}
      </div>
    </div>
  );
}
