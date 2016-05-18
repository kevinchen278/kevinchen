function cat = divideCat(g)

s=1;
for i=2:5
    for j=2:5
        for m=2:5
            for n=2:5
                str{s}=[num2str(i) num2str(j) num2str(m) num2str(n)];
                s=s+1;
            end;
        end;
    end;
end;

k = 1;
flag = zeros(256,1);
m = 1;
for i=1:256
%     if (g.(['s' str{i}]).Num == 1) || (g.(['m' str{i}]).Num == 1)
%         continue;
%     end;    
    if flag(i) == 0
        flag(i) = i;
        cat.list{k} = [str{i}];
        cat.spam{k} = g.(['s' str{i}]).Num;
        cat.minmax{k} = g.(['m' str{i}]).Num;
        cur = i;
        
        for j=i+1: 256
            if flag(j) == 0
                res = SameMode(g, str{cur}, str{j});
                if ((res.spam==1) && (res.minmax==1))
                    cat.list{k} = [cat.list{k} ' ' str{j}];
                    flag(j)=1;
                end;
            end;
        end;    
        k = k+1;
    end;
end;

dim = zeros(36,1);
for i=1:length(cat.list)
    dim(i) = cat.spam{i}*12 + 33*cat.minmax{i};
end;

[~,index]=sort(dim);

fp = fopen('VcList.csv','w');
for j=1:length(cat.list)
    i = index(j);
    fprintf(fp,'%d,%s,%d,%d\n',j,cat.list{i}, cat.spam{i}, cat.minmax{i});
end;
fclose(fp)


end


function res = SameMode(g,mode,mode2)

res.spam = -1; 
res.minmax = -1;

if (g.(['s' mode]).Num == g.(['s' mode2]).Num)
    res.spam = sum(abs(double(g.(['s' mode]).table) - double(g.(['s' mode2]).table)))==0;
end;

if (g.(['m' mode]).Num == g.(['m' mode2]).Num)
    res.minmax = sum(abs(double(g.(['m' mode]).table) - double(g.(['m' mode2]).table)))==0;
end;

end








