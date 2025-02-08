console.log("Content script loaded");

// 페이지 본문 추출 함수
function extractPageContent() {
  // article, main 태그나 주요 콘텐츠 영역을 찾습니다
  const mainContent = document.querySelector('article, main, [role="main"]');

  if (mainContent) {
    return mainContent.textContent?.trim();
  }

  // 주요 태그가 없는 경우 body에서 불필요한 요소를 제외하고 추출
  const body = document.body;
  const clonedBody = body.cloneNode(true) as HTMLElement;

  // 불필요한 요소 제거
  ["script", "style", "nav", "header", "footer", "iframe"].forEach((tag) => {
    clonedBody.querySelectorAll(tag).forEach((el) => el.remove());
  });

  return clonedBody.textContent?.trim();
}

// 메시지 리스너 추가
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === "getPageContent") {
    const content = extractPageContent();
    sendResponse({ content });
  }
  return true;
});
