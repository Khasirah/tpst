import {ReactNode} from "react";

interface ChildrenBaseProps {
  children: ReactNode
}

export type LayoutProps = ChildrenBaseProps

export interface TitlePageProps {
  title: string
}