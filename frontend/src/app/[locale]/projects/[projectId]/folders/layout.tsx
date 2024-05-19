import FoldersPane from './FoldersPane';
import { useTranslations } from 'next-intl';

export default function FoldersLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { projectId: string; locale: string };
}) {
  const t = useTranslations('Folders');
  const messages = {
    folder: t('folder'),
    newFolder: t('new_folder'),
    editFolder: t('edit_folder'),
    deleteFolder: t('delete_folder'),
    folderName: t('folder_name'),
    folderDetail: t('folder_detail'),
    close: t('close'),
    create: t('create'),
    update: t('update'),
    pleaseEnter: t('please_enter'),
  };

  return (
    <div className="flex w-full">
      <FoldersPane projectId={params.projectId} messages={messages} locale={params.locale} />
      <div className="flex-grow w-full">{children}</div>
    </div>
  );
}
