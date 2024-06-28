export default function ItemText({text,color='#dbeafe'}) {
  return (
    <div class="flex items-center rounded-full text-dark cursor-default gap-1 h-5 px-2 w-fit" style={{backgroundColor:color}}>
      <span class="font-semibold text-xs leading-normal inline-block py-1 px-0">
        {text}
      </span>
    </div>
  );
}
