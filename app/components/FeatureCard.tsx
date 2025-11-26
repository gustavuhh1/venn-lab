"use client";
import styled from "styled-components";
import Image from "next/image";

const AccentBar = styled.div<{ color: "a" | "b" | "c" | "d" }>`
  height: 4px;
  width: 100%;
  margin-top: -4px;
  background: ${({ color }) =>
    color === "a"
      ? "#22C55E"
      : color === "b"
        ? "#F97316"
        : color === "c"
          ? "#3B82F6"
          : color === "d"
            ? "#c80bcb"
            : "#22C55E"};
`;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  background: var(--card-background, #ffffff);
  border: 1px solid #e5e7eb;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
  transition:
    transform 150ms ease,
    box-shadow 150ms ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.15);
  }
`;

const CardImage = styled(Image)`
  width: 100%;
  border-bottom: 1px solid #e5e7eb;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 0.75rem 0.75rem 1rem;
`;

const CardTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const CardText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

export type FeatureCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  accentColor: "a" | "b" | "c" | "d";
};

export function FeatureCard({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  accentColor,
}: FeatureCardProps) {
  return (
    <Card>
      <CardImage src={imageSrc} alt={imageAlt} width={360} height={230} />
      <AccentBar color={accentColor} />
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardText>{subtitle}</CardText>
      </CardContent>
    </Card>
  );
}
