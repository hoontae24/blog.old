import { FC } from "react"

/** HOC 함수를 생성하는 함수, wrapping(layout)용 컴포넌트를 먼저 파라미터로 넣어주면 HOC함수를 리턴 */
export const createHOC = function <ParentProps extends {}>(
  /** HOC warpping 컴포넌트 */
  ParentComponent: FC<ParentProps>
) {
  return (
    /** HOC wrapping 컴포넌트 Props 기본 값, ParentComponent.getInitialProps의 결과로 덮어 씌워 짐 */
    defaultParentProps?: Partial<ParentProps>
  ) => {
    return function <PageProps extends {}>(
      /** HOC content 컴포넌트 */
      PageComponent: FC<PageProps>
    ) {
      const HighOrderedComponent: FC<ParentProps & PageProps> = (props) => {
        return (
          <ParentComponent {...defaultParentProps} {...props}>
            <PageComponent {...props} />
          </ParentComponent>
        )
      }

      return HighOrderedComponent
    }
  }
}
